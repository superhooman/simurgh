const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid").v4;
const User = require("../../models/user");
const validateUser = require("../../validators/user");

module.exports = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res.json({
      success: false,
      message: error.details[0].message
    });

  const userExists = await User.findOne({
    username: req.body.username
  });

  const isFirstAdmin = !(await User.countDocuments({ admin: true }));

  if (userExists)
    return res.json({
      success: false,
      message: "User exists"
    });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    admin: isFirstAdmin,
    uuid: uuidv4()
  });

  try {
    const savedUser = await user.save();
    return res.json({
      success: true,
      user: savedUser
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "DB Error"
    });
  }
};
