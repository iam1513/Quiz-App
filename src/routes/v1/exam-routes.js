const express = require("express");
const { authenticate } = require("../../middlewares/authenticate-middleware");
const router = express.Router();
const { examController } = require("../../controllers");

router.get("/attempt/:id", authenticate, examController.attemptQuiz);
router.post("/submit", authenticate, examController.submitQuiz);

module.exports = router;
