const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const validateUser = require("../../validators/user");

module.exports = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.json({
      success: false,
      message: error.details[0].message
    });
  }

  const user = await User.findOne({
    username: req.body.username
  });

  if (!user) {
    return res.json({
      success: false,
      message: "Wrong login"
    });
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) {
    return res.json({
      success: false,
      message: "Wrong password"
    });
  }

  const token = jwt.sign(
    {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      admin: user.admin
    },
    process.env.SECRET
  );

  return res.header("Authorization", `Bearer ${token}`).json({
    success: true,
    token
  });
};
