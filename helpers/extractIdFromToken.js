const jwt = require("jsonwebtoken");

module.exports = tokenReq => {
  const token = tokenReq.split(" ")[1];
  const decoded = jwt.verify(token, "secret");
  const { id } = decoded;

  return id;
};
