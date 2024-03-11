const express = require("express");

const router = express.Router();
// const userRoutes = require("./user-routes");
const signInRoutes = require("./sign-in");
const signUpRoutes = require("./sign-up");
router.use("/signUp", signUpRoutes);
router.use("/signIn", signInRoutes);
module.exports = router;
