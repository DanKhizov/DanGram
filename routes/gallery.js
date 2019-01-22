const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const loginValidation = require('../middlewares/loginValidation');
const twoFA = require('../middlewares/twoFA');
const contentUpload = require('./contentUpload');

router.get('/', isLoggedIn, (req, res) => {
	const { token: tokenReq } = req.body;
	const token = tokenReq.split(' ')[1];
	const decoded = jwt.verify(token, 'secret');
	const { id } = decoded;

	if (!id) return res.status(403).send('Bad token');

	const user = await User.findById(id);

	if (user) return next();

	res.status(500).send('Smth bad with auth to secret pages');
});

module.exports = router;
