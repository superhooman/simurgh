const User = require("../../models/user");
const createUUIDFromId = require("../../utils/createUUIDFromId");
const createFullProfileResponse = require("../../utils/createFullProfileResponse");

module.exports = async (req, res) => {
  const uuid = createUUIDFromId(req.params.uuid);

  const user = await User.find({ uuid });

  if (user) {
    return res.json(createFullProfileResponse(user, req.query.unsigned));
  }

  return res.status(204).json({});
};
