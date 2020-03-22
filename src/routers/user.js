const router = require("express").Router();

const create = require("../handlers/user/create");
const login = require("../handlers/user/login");
const changePassword = require("../handlers/user/changePassword");
const changeSkin = require("../handlers/user/changeSkin");
const changeCape = require("../handlers/user/changeCape");

const verifyToken = require("../utils/verify");

router.post("/register", create);

router.post("/login", login);

router.post("/changePassword", changePassword);

router.post("/changeSkin", verifyToken, changeSkin);

router.post("/changeCape", verifyToken, changeCape);

module.exports = router;
