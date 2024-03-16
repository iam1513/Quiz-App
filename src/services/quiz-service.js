const { quizRepository } = require("../repositories");
const QuizRepository = new quizRepository();
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

async function createQuiz(data) {
  try {
    const quiz = await QuizRepository.create(data);
    return quiz;
  } catch (error) {
    throw new Error("Error in Quiz Service");
  }
}

async function getQuiz(id) {
  try {
    const quiz = await QuizRepository.get(id);
    if (quiz.is_published) {
      throw new AppError(
        "Cannot update Published Quiz.",
        StatusCodes.FORBIDDEN
      );
    }
    return quiz;
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

async function updateQuiz(id, data) {
  try {
    const updatedQuiz = await QuizRepository.update(id, data);
    if (updatedQuiz.is_published) {
      throw new Error(
        "Cannot update Published Quiz.",
        StatusCodes.FORBIDDEN
      );
    }
    return updatedQuiz;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The quiz you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of the quiz",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteQuiz(id) {
  try {
    const quiz = await QuizRepository.destroy(id);
    if (quiz.is_published) {
      throw new Error(
        "Cannot update Published Quiz.",
        StatusCodes.FORBIDDEN
      );
    }
    return quiz;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The quiz you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of the quiz",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function publishQuiz(data) {
  try {
    const quizId = data.quizId;
    const quiz = await QuizRepository.publish(quizId);

    quiz.is_published = true;

    return quiz;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The quiz you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of the quiz",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz };
