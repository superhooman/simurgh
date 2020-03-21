const packageConf = require("../../../package.json");
const keychain = require("../../utils/keychain");

module.exports = (req, res) =>
  res.json({
    Status: "OK",
    "Runtime-Mode": "productionMode",
    "Application-Author": packageConf.author,
    "Application-Description": packageConf.name,
    "Specification-Version": "2.13.34",
    "Application-Name": "mjolnir.auth.server",
    "Implementation-Version": packageConf.version,
    signaturePublickey: keychain.get("public"), // Authlib-injector
    skinDomains: [process.env.DOMAIN], // Authlib-injector
    "Application-Owner": process.env.serverOwner
  });
