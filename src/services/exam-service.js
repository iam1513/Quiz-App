const { quizRepository, resultRepository } = require("../repositories");
const QuizRepository = new quizRepository();
const ResultRepository = new resultRepository();
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

async function attemptQuiz(id) {
  try {
    const quiz = await QuizRepository.get(id);

    if (!quiz.is_published) {
      throw new AppError(
        "The Quiz you requested is not published",
        StatusCodes.NOT_FOUND
      );
    }
    return quiz;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Quiz you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of all the Quiz",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function submitQuiz(data, userId) {
  try {
    const quizId = data.quizId;
    const quiz = await QuizRepository.get(quizId);
    const attempted_questions = data.attempted_questions;
    const answers = quiz.answers;
    const allQuestion = Object.keys(answers);
    const total = allQuestion.length;

    let score = 0;

    for (let i = 0; i < total; i++) {
      let question_number = allQuestion[i];
      if (
        !!attempted_questions[question_number] &&
        answers[question_number] == attempted_questions[question_number]
      ) {
        score += 1;
      }
    }

    const result = await ResultRepository.create({
      userId: userId,
      quizId: quizId,
      score: score,
      total: total,
    });

    const Result = await result.save();

    return result;
  } catch (error) {
    throw new AppError(
      "Not able to submit the quiz",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { attemptQuiz, submitQuiz };
