const User = require('../models/User');
const validateLoginInput = require('../validations/login');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) return res.status(400).json(errors);

	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		errors.email = 'User not found';
		return res.status(404).json(errors);
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		errors.password = 'Incorrect Password';
		return res.status(400).json(errors);
	}

	return next();
};
