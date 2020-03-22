const Texture = require("../../models/texture");

module.exports = async (req, res) => {
  if (!req.file) {
    return res.json({
      success: false,
      message: "No file"
    });
  }
  const texture = new Texture({
    type: "cape",
    file: req.file.path.split("cape/")[1]
  });

  try {
    const savedCape = await texture.save();
    return res.json({
      success: true,
      cape: savedCape
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "DB Error"
    });
  }
};
