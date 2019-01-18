const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const validateRegisterInput = require('../validations/register');
const User = require('../models/User');

module.exports = async (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) return res.status(400).json(errors);

	const { name, email, password: plainPassword } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		return res.status(400).json({
			email: 'Email already exists',
		});
	}

	// Граватар - костыль
	const avatar = gravatar.url(email, {
		s: '200',
		r: 'pg',
		d: 'mm',
	});

	const password = await bcrypt.hash(plainPassword, 10);
	const newUser = await new User({
		name,
		email,
		avatar,
		password,
	}).save();

	res.json(newUser);
};
