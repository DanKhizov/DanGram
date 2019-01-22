const User = require('../models/User');
const Validation = require('../models/Validation');

module.exports = async (req, res, next) => {
	const { email, clientTwoFA } = req.body;
	const user = await User.findOne({ email });

	if (!user.twoFA) return next();

	if (!clientTwoFA) {
		const serverTwoFA = await new Validation({ user }).save();
		const { uniqKey } = serverTwoFA;
		console.log(`CREATED NEW KEY ${serverTwoFA.answer}`);

		return res.status(200).json({ uniqKey });
	}

	if (clientTwoFA) {
		const { uniqKey, answer: clientAnswer } = clientTwoFA;
		const serverTwoFA = await Validation.findOne({ uniqKey });
		const { answer: serverAnswer } = serverTwoFA;

		if (serverAnswer !== clientAnswer) {
			return res.status(404).json({ twoFA: 'Code is not matching' });
		}

		await Validation.findByIdAndDelete(serverTwoFA._id);

		return next();
	} else {
		console.log('WATCH IT!!!!!!!!!!!! SMTH CRASHED');
		return res.status(500).json({ status: 'Failed' });
	}
};
