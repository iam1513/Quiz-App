const express = require("express");

const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate-middleware");
const { quizController } = require("../../controllers");

router.post("/", authenticate, quizController.createQuiz);
router.get("/:id", authenticate, quizController.getQuiz);
router.put("/:id", authenticate, quizController.updateQuiz);
router.delete("/:id", authenticate, quizController.deleteQuiz);
router.patch("/publish", authenticate, quizController.publishQuiz);
module.exports = router;
