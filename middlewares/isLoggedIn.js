const User = require("../models/User");
const extractIdFromToken = require("../helpers/extractIdFromToken");

module.exports = async (req, res, next) => {
  const { token: tokenReq } = req.body;

  if (!tokenReq) return res.status(401).send("You must be auth");

  const id = extractIdFromToken(tokenReq);
  if (!id) return res.status(403).send("Bad token");

  const user = await User.findById(id);
  if (user) return next();

  res.status(500);
};
