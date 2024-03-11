const express = require("express");

const router = express.Router();
const userRoutes = require("./user-routes");
const signInRoutes = require("./sign-in");

router.use("/users", userRoutes);
router.use("/signIn", signInRoutes);
module.exports = router;
