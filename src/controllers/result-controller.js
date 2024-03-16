const { resultService } = require("../services");

async function resultQuiz(req, res) {
  // try {
    const result = await resultService.resultQuiz(req.params.id, req.userId);
    return res.status(200).json({
      success: true,
      message: "Request Successfully completed",
      data: result,
      error: {},
    });
  // } catch (error) {
  //   throw new Error("Error in controller");
  // }
}

module.exports = { resultQuiz };
