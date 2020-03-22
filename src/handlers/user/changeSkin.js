const User = require("../../models/user");

module.exports = async (req, res) => {
  if (!req.body.texture) {
    return res.json({
      success: false,
      message: "No file"
    });
  }
  if (req.body.texture.type !== "skin") {
    return res.json({
      success: false,
      message: "Wrong file"
    });
  }
  const user = await User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    req.user._id,
    {
      skin: req.body.texture.file
    },
    {
      new: true
    }
  );
  return res.json({
    success: true,
    user
  });
};
