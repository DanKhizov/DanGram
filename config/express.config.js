const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const auth = require("../routes/auth");
const files = require("../routes/files/index");

module.exports = app => {
  app.use(logger("dev"));
  app.use(passport.initialize());
  require("./passport.config")(passport);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Routes
  app.use("/api/auth/", auth);
  app.use("/api/files/", files);
};
