const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];
  if (!token)
    return res.json({
      success: false
    });
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    if (verified) {
      // eslint-disable-next-line no-underscore-dangle
      const user = await User.findById(verified._id);
      const reset = new Date(user.reset).getTime() / 1000;
      if (verified.iat >= reset) {
        req.user = verified;
        return next();
      }
    }
    return res.json({
      success: false,
      message: "Bad token"
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "DB Error"
    });
  }
};
