const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
	const { token: tokenReq } = req.body;

	if (!tokenReq) return res.status(401).send('You must be auth');

	const token = tokenReq.split(' ')[1];
	const decoded = jwt.verify(token, 'secret');
	const { id } = decoded;

	if (!id) return res.staus(403).send('Bad token');

	const user = await User.findById(id);

	if (user) return next();

	res.status(500).send('Smth bad with auth to secret pages');
};
