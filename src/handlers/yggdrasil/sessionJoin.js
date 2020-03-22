const User = require("../../models/user");
const createIdFromUUID = require("../../utils/createIdFromUUID");

module.exports = async (req, res) => {
  const badResponse = {
    error: "ForbiddenOperationException",
    errorMessage: "Invalid token"
  };
  if (!req.body.serverId) {
    return res.json({
      error: "IllegalArgumentException",
      errorMessage: "accessToken.getServerId() can not be null or empty."
    });
  }

  if (!req.body.accessToken) {
    return res.json({
      error: "IllegalArgumentException",
      errorMessage: "Access Token can not be null or empty."
    });
  }

  if (!req.body.selectedProfile) {
    return res.json({
      error: "IllegalArgumentException",
      errorMessage: "selectedProfile can not be null."
    });
  }

  const user = await User.findOne({ accessToken: req.body.accessToken });

  if (req.body.selectedProfile !== createIdFromUUID(user.uuid)) {
    return res.json(badResponse);
  }

  await User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    user._id,
    { serverId: req.body.serverId },
    { new: true }
  );

  return res.json({});
};
