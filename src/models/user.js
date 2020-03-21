const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  skin: {
    type: String,
    default: "steve.png"
  },
  uuid: {
    type: String,
    required: true
  },
  cape: {
    type: String
  },
  accessToken: {
    type: String
  },
  clientToken: {
    type: String
  },
  serverId: {
    type: String
  },
  admin: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  reset: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
