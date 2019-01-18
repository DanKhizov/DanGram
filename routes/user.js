const express = require('express');
const router = express.Router();
const signupHandler = require('./signup');
const loginHandler = require('./login');
const isLoggedIn = require('../middlewares/isLoggedIn');
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
	destination: '!data/',
	filename: function(req, file, cb) {
		let uniq = Date.now();
		cb(null, file.fieldname + uniq + path.extname(file.originalname));
	},
});

let upload = multer({ storage }).single('image');

router
	.post('/register', (req, res) => signupHandler(req, res))
	.post('/login', (req, res) => loginHandler(req, res))
	.post('/secret', isLoggedIn, (req, res) => {
		res.status(200).send('{ "content" : "Hello, world!" }');
	})

	.post('/images', (req, res) => {
		upload(req, res, err => {
			if (err) return console.log(err);
			console.log(req.file);

			res.send('OK');
		});
	});

module.exports = router;
