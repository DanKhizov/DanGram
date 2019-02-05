const { Schema, model } = require('mongoose');
const uuidv1 = require('uuid/v1');
const cryptoRandomString = require('crypto-random-string');

const ValidationSchema = new Schema({
	uniqKey: { type: String, required: true, default: uuidv1() },
	answer: {
		type: String,
		required: true,
		default: cryptoRandomString(6).toUpperCase(),
	},
	user: { type: Schema.Types.ObjectId, required: true },
});

module.exports = model('validations', ValidationSchema);
