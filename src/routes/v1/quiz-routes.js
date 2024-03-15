const express = require("express");

const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate-middleware");
const { quizController } = require("../../controllers");

router.post("/", authenticate, quizController.createQuiz);

module.exports = router;
