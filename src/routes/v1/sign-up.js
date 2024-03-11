const express = require("express");
const { userController } = require("../../controllers");
const router = express.Router();

router.post("/", userController.createUser);
// createUser definesd in contoller to create a New User

module.exports = router;
