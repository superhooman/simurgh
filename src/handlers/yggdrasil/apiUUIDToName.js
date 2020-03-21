const User = require("../../models/user");
const createUUIDFromId = require("../../utils/createUUIDFromId");

module.exports = async (req, res) => {
  const user = await User.find({ uuid: createUUIDFromId(req.params.uuid) });

  if (user) {
    return res.json([
      {
        name: user.username
      }
    ]);
  }

  return res.status(204).json({});
};
