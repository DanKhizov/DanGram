const jwt = require("jsonwebtoken");

module.exports = authorization => {
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, "secret");

  if (decoded) return decoded;

  return null;
};
