const express = require('express');
const router = express.Router();
const signupHandler = require('./signup');
const loginHandler = require('./login');
const isLoggedIn = require('../middlewares/isLoggedIn');
const loginValidation = require('../middlewares/loginValidation');
const twoFA = require('../middlewares/twoFA');
const contentUpload = require('./contentUpload');

router
	.post('/register', (req, res) => signupHandler(req, res))
	.post('/login', loginValidation, twoFA, (req, res) => loginHandler(req, res))
	.post('/images', (req, res) => contentUpload(req, res))
	.get('/images', (req, res) => {})
	.post('/secret', isLoggedIn, (req, res) => {
		res.status(200).json({ content: 'Hello, world!' });
	});

module.exports = router;
