const { examService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
async function attemptQuiz(req, res) {
  try {
    const quiz = await examService.attemptQuiz(req.params.id);
    const filteredQuiz = {
      name: quiz.name,
      questions_list: quiz.questions_list,
      is_published: quiz.is_published,
    };

    SuccessResponse.data = filteredQuiz;
    // HANDLE STATUS
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function submitQuiz(req, res) {
  try {
    const result = await examService.submitQuiz(req.body.data, req.userId);
    const filteredResult = {
      score: result.score,
      total: result.total,
      result_id: result._id,
    };

    SuccessResponse.data = filteredResult;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { attemptQuiz, submitQuiz };
