const CrudRepository = require("./crud-repository");
const Quiz = require("../models/quiz-model");

class quizRepository extends CrudRepository {
  constructor() {
    super(Quiz);
  }
  async publish(id) {
    try {
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        throw new Error("Quiz not found");
      }
      quiz.is_published = true;
      const updatedQuiz = await quiz.save();
      return updatedQuiz;
    } catch (error) {
      console.log("Error while publishing quiz:", error);
      throw error;
    }
  }
}

module.exports = quizRepository;
