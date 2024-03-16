const { resultService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
async function resultQuiz(req, res) {
  try {
    const result = await resultService.resultQuiz(req.params.id, req.userId);
    SuccessResponse.data = result;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { resultQuiz };
