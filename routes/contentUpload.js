const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
	destination: '!data/',
	filename: (req, file, cb) => {
		let uniq = Date.now();
		cb(null, file.fieldname + uniq + path.extname(file.originalname));
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
