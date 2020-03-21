const crypto = require("crypto");

module.exports = (username, type = "access") =>
  crypto
    .createHash("md5")
    .update(
      `${username}${type.toUpperCase()}${new Date().getTime()}${
        process.env.SECRET
      }`
    )
    .digest("hex");
