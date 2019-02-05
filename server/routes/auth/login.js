const jwt = require("jsonwebtoken");
const expiresIn = "1d";
const User = require("../../models/User");

module.exports = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  const payload = {
    id: user.id,
    name: user.name,
    avatar: user.avatar
  };

  const token = jwt.sign(payload, "secret", { expiresIn });

  return res.json({
    success: true,
    token: `Bearer ${token}`
  });
};
