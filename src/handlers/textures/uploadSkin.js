const Texture = require("../../models/texture");

module.exports = async (req, res) => {
  if (!req.file) {
    return res.json({
      success: false,
      message: "No file"
    });
  }
  const texture = new Texture({
    type: "skin",
    file: req.file.path.split("skin/")[1]
  });

  try {
    const savedSkin = await texture.save();
    return res.json({
      success: true,
      skin: savedSkin
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "DB Error"
    });
  }
};
