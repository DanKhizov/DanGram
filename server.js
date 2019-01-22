const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/user');
const gallery = require('./routes/gallery');

mongoose.connect(
	'mongodb://localhost:27017/metaSharer',
	{ useNewUrlParser: true }
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/gallery', gallery);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => `Server running on port ${PORT}`);
