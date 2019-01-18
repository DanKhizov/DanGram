const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateLoginInput = require('../validations/login');
const tokenExpires = '1d';
const User = require('../models/User');

module.exports = async (req, res) => {
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

	const payload = {
		id: user.id,
		name: user.name,
		avatar: user.avatar,
	};

	const token = jwt.sign(payload, 'secret', { expiresIn: tokenExpires });

	res.json({
		success: true,
		token: `Bearer ${token}`,
	});
};
