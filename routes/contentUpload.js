const multer = require('multer');
const path = require('path');
const uuidv1 = require('uuid/v1');

let storage = multer.diskStorage({
	destination: '!data/',
	filename: (req, file, cb) => {
		const fileName = uuidv1() + path.extname(file.originalname);
		cb(null, fileName);
	},
});

let upload = multer({ storage }).single('image');

module.exports = (req, res) => {
	upload(req, res, err => {
		if (err) {
			console.log(err);
			return res.status(500).send("File wasn't uploaded");
		}
		console.log(req.file);

		res.send('OK');
	});
};
