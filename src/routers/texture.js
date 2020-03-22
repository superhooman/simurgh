const router = require("express").Router();

const uploadSkin = require("../handlers/textures/uploadSkin");
const uploadCape = require("../handlers/textures/uploadCape");
const verifyToken = require("../utils/verify");

const upload = require("../utils/upload");

router.post("/uploadSkin", [upload.single("skin"), verifyToken], uploadSkin);
router.post("/uploadCape", [upload.single("cape"), verifyToken], uploadCape);

module.exports = router;
