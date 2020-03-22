const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const makeToken = require("../../utils/makeToken");
const createIdFromUUID = require("../../utils/createIdFromUUID");

module.exports = async (req, res) => {
  const badResponse = {
    error: "ForbiddenOperationException",
    errorMessage: "Invalid credentials. Invalid username or password."
  };
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.json(badResponse);
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) {
    return res.json(badResponse);
  }

  const newUser = await User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    user._id,
    {
      lastLogin: new Date(),
      accessToken: makeToken(user.username, "access"),
      clientToken: req.body.clientToken || makeToken(user.username, "client")
    },
    {
      new: true
    }
  );

  const resultResponse = {
    accessToken: newUser.accessToken,
    clientToken: newUser.clientToken
  };

  if (req.body.agent) {
    resultResponse.selectedProfile = {
      id: createIdFromUUID(newUser.uuid),
      name: user.username
    };
    resultResponse.availableProfiles = [resultResponse.selectedProfile];
  }

  return res.json(resultResponse);
};
