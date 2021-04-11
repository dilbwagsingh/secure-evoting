const crypto = require("crypto");

const hash = (message) => {
  return crypto.createHash("sha256").update(message).digest("hex");
};

module.exports = { hash };
