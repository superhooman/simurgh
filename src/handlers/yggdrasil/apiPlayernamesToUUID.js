const User = require("../../models/user");
const createIdFromUUID = require("../../utils/createIdFromUUID");

module.exports = async (req, res) => {
  if (typeof req.body !== "object") {
    return res.json({
      error: "IllegalArgumentException",
      errorMessage: "Invalid payload."
    });
  }

  if (Object.keys(req.body).length > 100) {
    return res.json({
      error: "IllegalArgumentException",
      errorMessage: "Too many names."
    });
  }

  const queries = [];

  req.body.forEach(async un => {
    if (typeof un !== "string" || !un) {
      res.json({
        error: "IllegalArgumentException",
        errorMessage: "Empty username."
      });
    }

    const user = await User.findOne({ username: un });
    const userId = createIdFromUUID(user.uuid);

    queries.push({
      id: userId,
      name: user.username
    });
  });

  return res.json(queries);
};
