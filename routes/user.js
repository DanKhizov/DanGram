const express = require('express');
const router = express.Router();
const signupHandler = require('./signup');
const loginHandler = require('./login');
const uploadHandler = require('./contentUpload');
const isLoggedIn = require('../middlewares/isLoggedIn');
const twoFA = require('../middlewares/twoFA');
const loginValidation = require('../middlewares/loginValidation');

router
	.post('/register', (req, res) => signupHandler(req, res))
	.post('/login', loginValidation, twoFA, (req, res) => loginHandler(req, res))
	.post('/images', (req, res) => uploadHandler(req, res))
	.post('/secret', isLoggedIn, (req, res) => {
		res.status(200).json({ content: 'Hello, world!' });
	});

module.exports = router;
