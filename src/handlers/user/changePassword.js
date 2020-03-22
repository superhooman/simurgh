const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const validateUserNewPass = require("../../validators/userNewPass");

module.exports = async (req, res) => {
  const { error } = validateUserNewPass(req.body);

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

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  const newUser = await User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    req.user._id,
    {
      password: hashedPassword
    },
    {
      new: true
    }
  );
  return res.json({
    success: true,
    newUser
  });
};
