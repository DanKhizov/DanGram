const router = require("express").Router();
const signupHandler = require("./signup");
const loginHandler = require("./login");
const twoFA = require("../../middlewares/twoFA");
const loginValidation = require("../../middlewares/loginValidation");

router
  .post("/register", (req, res) => signupHandler(req, res))
  .post("/login", loginValidation, twoFA, (req, res) => loginHandler(req, res));

module.exports = router;
