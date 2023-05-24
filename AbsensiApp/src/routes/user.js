const express = require("express");
const { fileUploader, upload } = require("../middlewares/multer");
const router = express.Router();
const userController = require("../controllers").userController;
router.get("/", userController.getAll);
router.get("/register", userController.register);
router.get("/login", userController.login);
router.get("/loginv2", userController.loginv2);
router.post("/", userController.insertUserV1, userController.getAll);
router.get("/token", userController.getByToken);
router.get("/tokenv2", userController.getByTokenV2);
router.get("/forgotpassword", userController.getTokenByEmail);
router.get("/:id", userController.getById);

router.post(
	"/image/v1/:id",
	fileUploader({
		destinationFolder: "avatar",
	}).single("avatar"),
	userController.uploadAvatar
);

router.post(
	"/image/v2/:id",
	upload.single("avatar"),
	userController.uploadAvatarV2
);

router.get("/image/render/:id", userController.renderAvatar);

module.exports = router;
