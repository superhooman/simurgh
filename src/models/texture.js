const mongoose = require("mongoose");

const textureSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Texture", textureSchema);
