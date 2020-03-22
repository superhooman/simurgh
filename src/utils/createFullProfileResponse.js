const moment = require("moment");
const btoa = require("btoa");
const crypto = require("crypto");
const keychain = require("./keychain");
const createIdFromUUID = require("./createIdFromUUID");

const generateSignature = value => {
  const key = keychain.get("private");
  const signature = crypto.createSign("sha1WithRSAEncryption");

  signature.update(value);
  return signature.sign(key, "base64");
};

module.exports = (user, unsigned) => {
  const profileId = createIdFromUUID(user.uuid);

  const valueJson = {
    timestamp: moment().unix(),
    profileId,
    profileName: user.username,
    isPublic: true,
    textures: {
      SKIN: {
        url: `https://${process.env.DOMAIN}/skin/${
          user.skin ? user.skin : "steve.png"
        }`
      }
    }
  };
  if (user.capeUrl) {
    valueJson.textures.CAPE = {
      url: `https://${process.env.DOMAIN}/cape/${user.cape}`
    };
  }
  console.log(valueJson);

  const value = btoa(JSON.stringify(valueJson));

  const response = {
    id: profileId,
    name: user.username,
    properties: [
      {
        name: "textures",
        value
      }
    ]
  };

  if (!unsigned) {
    response.properties[0].signature = generateSignature(value);
  }

  return response;
};
