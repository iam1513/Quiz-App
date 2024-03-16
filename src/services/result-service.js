const { resultRepository } = require("../repositories");
const ResultRepository = new resultRepository();
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

async function resultQuiz(id, userId) {
  try {
    let result;
    if (id) {
      result = await ResultRepository.get(id);
      if (userId !== result.userId.toString()) {
        throw new AppError(
          "Not allowed to access the quiz.",
          StatusCodes.FORBIDDEN
        );
      }
      return result;
    } else {
      result = await ResultRepository.resultQuizzes(userId);
      return result;
    }
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The quiz you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of all the quiz",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { resultQuiz };
