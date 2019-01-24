const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const extractIdFromToken = require("../helpers/extractIdFromToken");

router.get("/", isLoggedIn, async (req, res) => {
  const { token: tokenReq } = req.body;
  const id = extractIdFromToken(tokenReq);

  if (!id) return res.status(403).send("Bad token");

  const user = await User.findById(id);

  if (user) return next();

  res.status(500).send("Smth bad with gallery get");
});

module.exports = router;
