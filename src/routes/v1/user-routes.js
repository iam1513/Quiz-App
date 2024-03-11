const express = require("express");

const router = express.Router();
const { userController } = require("../../controllers");
router.get("/:id", userController.getUser);

module.exports = router;
