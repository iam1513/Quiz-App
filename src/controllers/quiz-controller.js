const { quizService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
async function createQuiz(req, res) {
  try {
    // console.log(req.userId);
    const quiz = await quizService.createQuiz({
      name: req.body.data.name,
      questions_list: req.body.data.questions_list,
      answers: req.body.data.answers,
      created_by: req.userId,
      is_published: req.body.data.is_published,
    });

    SuccessResponse.data = quiz;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getQuiz(req, res) {
  try {
    const quiz = await quizService.getQuiz(req.params.id);
    const filteredQuiz = {
      name: quiz.name,
      questions_list: quiz.questions_list,
      answers: quiz.answers,
    };

    SuccessResponse.data = filteredQuiz;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateQuiz(req, res) {
  try {
    const quiz = await quizService.updateQuiz(req.params.id, req.body.data);
    const requestor = req.userId;
    const creator = quiz.created_by.toString();
    if (creator === requestor) {
      SuccessResponse.data = quiz;
    return res.status(StatusCodes.OK).json(SuccessResponse);
    }
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteQuiz(req, res) {
  try {
    const quiz = await quizService.deleteQuiz(req.params.id);
    const requestor = req.userId;
    const creator = quiz.created_by.toString();
    if (creator === requestor) {
      SuccessResponse.data = quiz;
    return res.status(StatusCodes.OK).json(SuccessResponse);
    }
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function publishQuiz(req, res) {
  try {
    const quiz = await quizService.publishQuiz(req.body);
    const requestor = req.userId;
    const creator = quiz.created_by.toString();
    if (creator === requestor) {
      SuccessResponse.data = quiz;
    return res.status(StatusCodes.OK).json(SuccessResponse);
    } else {
      ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
    }
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz };
