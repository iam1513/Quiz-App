const express = require("express");
const authenticate = require("../../middlewares/authenticate-middleware");
const router = express.Router();
const { userController } = require("../../controllers");
router.get("/:id",  userController.getUser);

module.exports = router;
