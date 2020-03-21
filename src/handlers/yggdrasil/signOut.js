const bcrypt = require("bcryptjs");
const User = require("../../models/user");

module.exports = async (req, res) => {
  const badResponse = {
    error: "ForbiddenOperationException",
    errorMessage: "Invalid credentials. Invalid username or password."
  };
  if (!req.body.username) {
    return res.json({
      error: "IllegalArgumentException",
      errorMessage: "Access Token can not be null or empty."
    });
  }

  const user = await User.find({ username: req.body.username });

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) {
    return res.json(badResponse);
  }

  await User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    user._id,
    {
      accessToken: ""
    },
    {
      new: true
    }
  );

  return res.json({});
};
