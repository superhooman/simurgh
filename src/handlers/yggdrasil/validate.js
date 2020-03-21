const moment = require("moment");
const User = require("../../models/user");

module.exports = async (req, res) => {
  const badResponse = {
    error: "ForbiddenOperationException",
    errorMessage: "Invalid token"
  };
  if (req.body.accessToken) {
    return res.json({
      error: "IllegalArgumentException",
      errorMessage: "Access Token can not be null or empty."
    });
  }
  const user = await User.find({ accessToken: req.body.accessToken });

  if (
    moment()
      .subtract(2, "hours")
      .isBefore(user.lastLogin)
  ) {
    return res.json({});
  }
  return res.json(badResponse);
};
