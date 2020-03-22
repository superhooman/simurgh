const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `images/${file.fieldname}`);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${file.fieldname}-${uniqueSuffix}.png`);
  }
});

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024
  },
  storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext.toLocaleLowerCase() !== ".png" || file.mimetype !== "image/png") {
      return callback("Only png are allowed");
    }
    return callback(null, true);
  }
});

module.exports = upload;
