const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	twoFA: {
		type: Boolean,
		default: true,
	},
	avatar: {
		type: String,
	},
	phone: {
		type: String,
	},
});

module.exports = model('users', UserSchema);
