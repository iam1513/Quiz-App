const { resultRepository } = require("../repositories");
const ResultRepository = new resultRepository();

async function resultQuiz(id, userId) {
  try {
    let result;
    if (id) {
      result = await ResultRepository.get(id);
      if (result) {
        console.log("Quiz Dont exit.");
        throw new Error("Quiz Dont exit.");
      }

      console.log(userId);
      console.log(result.userId.toString());

      if (userId !== result.userId.toString()) {
        console.log("Not allowed to access the quiz.");
        throw new Error("Not allowed to access the quiz.");
      }
      return result;
    } else {
      result = await ResultRepository.resultQuizzes(userId);
      return result;
    }
  } catch (error) {
    console.log("PROBLEM WHILE FETCHING A RESULT OF ONE QUIZ.");
    throw new Error("PROBLEM WHILE FETCHING A RESULT OF ONE QUIZ.");
  }
}

module.exports = { resultQuiz };
