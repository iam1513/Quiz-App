const express = require("express");
const { resultController } = require("../../controllers");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate-middleware");
router.get("/:id?", authenticate, resultController.resultQuiz);  
// ID will be optional , if we send , we will get specific result 
// else will get all results 

module.exports = router;
