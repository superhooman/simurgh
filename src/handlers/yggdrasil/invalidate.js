const User = require("../../models/user");

module.exports = async (req, res) => {
  const user = await User.find({ accessToken: req.body.accessToken });

  if (!req.body.clientToken || user.clientToken === req.body.clientToken) {
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
  }
  return res.json({});
};
