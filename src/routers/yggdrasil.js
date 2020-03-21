const router = require("express").Router();

const root = require("../handlers/yggdrasil/root");
const authenticate = require("../handlers/yggdrasil/authenticate");
const refresh = require("../handlers/yggdrasil/refresh");
const validate = require("../handlers/yggdrasil/validate");
const signOut = require("../handlers/yggdrasil/signOut");
const invalidate = require("../handlers/yggdrasil/invalidate");

const sessionJoin = require("../handlers/yggdrasil/sessionJoin");
const sessionHasJoined = require("../handlers/yggdrasil/sessionHasJoined");
const sessionUUIDToProfile = require("../handlers/yggdrasil/sessionUUIDToProfile");

const apiNameToUUID = require("../handlers/yggdrasil/apiNameToUUID");
const apiUUIDToName = require("../handlers/yggdrasil/apiUUIDToName");
const apiPlayernamesToUUID = require("../handlers/yggdrasil/apiPlayernamesToUUID");

// Authserver
router.all("/", root);
router.all("/authenticate", authenticate);
router.all("/refresh", refresh);
router.all("/validate", validate);
router.all("/signout", signOut);
router.all("/invalidate", invalidate);

// SessionServer
router.all("/session/minecraft/join", sessionJoin);
router.all("/session/minecraft/hasJoined", sessionHasJoined);
router.all("/session/minecraft/profile/:uuid", sessionUUIDToProfile);

// SessionServer for authlib-injector
router.all("/sessionserver/session/minecraft/join", sessionJoin);
router.all("/sessionserver/session/minecraft/hasJoined", sessionHasJoined);
router.all(
  "/sessionserver/session/minecraft/profile/:uuid",
  sessionUUIDToProfile
);

// APIserver
router.all("/users/profiles/minecraft/:name", apiNameToUUID);
router.all("/user/profiles/:uuid/names", apiUUIDToName);
router.all("/profiles/minecraft", apiPlayernamesToUUID);

module.exports = router;
