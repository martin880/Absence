const express = require("express");

const router = express.Router();

const mainController = require("../controllers").mainController;
router.get("/", mainController.getAll);
router.get("/:id", mainController.getById);
router.post("/:user_id", mainController.insertClockIn);
router.patch("/:user_id", mainController.insertClockOut);

module.exports = router;
