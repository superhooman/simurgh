const User = require("../../models/user");
const createFullProfileResponse = require("../../utils/createFullProfileResponse");

module.exports = async (req, res) => {
  if (!req.query.username || !req.query.serverId) {
    res.json({});
  }

  const user = await User.findOne({
    username: req.query.username
  });

  if (req.query.serverId === user.serverId) {
    return res.json(createFullProfileResponse(user, false));
  }

  return res.json({});
};
