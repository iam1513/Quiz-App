const express = require("express");

const router = express.Router();
// const userRoutes = require("./user-routes");
const signInRoutes = require("./sign-in");
const signUpRoutes = require("./sign-up");
const quizRoutes = require("./quiz-routes");
const userRoutes = require("./user-routes");
const examRoutes = require("./exam-routes");
const resultRoutes = require("./result-routes");
router.use("/signUp", signUpRoutes);
router.use("/signIn", signInRoutes);
router.use("/quiz", quizRoutes);
router.use("/user", userRoutes);
router.use("/exam", examRoutes);
router.use("/result", resultRoutes);
module.exports = router;
