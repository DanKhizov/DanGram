const User = require("../models/User");
const Validation = require("../models/Validation");

module.exports = async (req, res, next) => {
	const { email, clientTwoFA } = req.body;
	const user = await User.findOne({ email });

	console.log(req.body);

	if (!user.twoFA) return next();

	if (!clientTwoFA) {
		const serverTwoFA = await new Validation({ user }).save();
		const { uuid } = serverTwoFA;
		console.log(`CREATED NEW KEY ${serverTwoFA.answer}`);

		return res.status(200).json({ uuid });
	}

	if (clientTwoFA) {
		const { uuid, answer: clientAnswer } = clientTwoFA;
		const serverTwoFA = await Validation.findOne({ uuid });
		const { answer: serverAnswer } = serverTwoFA;

		if (serverAnswer !== clientAnswer) {
			return res.status(404).json({ twoFA: "Code is not matching" });
		}

		await Validation.deleteMany({ user: user._id });

		return next();
	}

	console.log("WATCH IT!!!!!!!!!!!! SMTH CRASHED");
	return res.status(500);
};
