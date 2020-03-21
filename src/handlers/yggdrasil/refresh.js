const User = require("../../models/user");
const makeToken = require("../../utils/makeToken");

module.exports = async (req, res) => {
  const badResponse = {
    error: "ForbiddenOperationException",
    errorMessage: "Invalid token."
  };
  if (req.body.accessToken) {
    return res.json({
      error: "IllegalArgumentException",
      errorMessage: "Access Token can not be null or empty."
    });
  }

  const user = await User.find({
    clientToken: req.body.clientToken
  });

  if (user.accessToken === req.body.accessToken) {
    const newUser = await User.findByIdAndUpdate(
      // eslint-disable-next-line no-underscore-dangle
      user._id,
      {
        lastLogin: new Date(),
        accessToken: makeToken(user.login, "access")
      },
      {
        new: true
      }
    );
    const jsonResponse = {
      accessToken: newUser.accessToken,
      clientToken: req.body.clientToken
    };
    if (req.body.selectedProfile) {
      jsonResponse.selectedProfile = req.body.selectedProfile;
    }
    return res.json(jsonResponse);
  }
  return res.json(badResponse);
};
