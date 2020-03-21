const User = require("../../models/user");
const createIdFromUUID = require("../../utils/createIdFromUUID");

module.exports = async (req, res) => {
  if (!req.params.name) {
    return res.status(400).json({
      error: "IllegalArgumentException",
      errorMessage: "Name is missing."
    });
  }

  const user = await User.find({ username: req.params.name });

  if (user) {
    const userId = createIdFromUUID(user.uuid);

    return res.json({
      id: userId,
      name: req.params.name
    });
  }

  return res.status(204).json({});
};
