const CrudRepository = require("./crud-repository");
const Quiz = require("../models/quiz-model");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class quizRepository extends CrudRepository {
  constructor() {
    super(Quiz);
  }
  async publish(id) {
      const quiz = await Quiz.findById(id);
      if(!quiz){
        throw new AppError("Not able to find the resource",StatusCodes.NOT_FOUND)
      }
      quiz.is_published = true;
      const updatedQuiz = await quiz.save();
      return updatedQuiz;
  }
}

module.exports = quizRepository;
