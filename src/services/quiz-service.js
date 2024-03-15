const { quizRepository } = require("../repositories");
const QuizRepository = new quizRepository();

async function createQuiz(data, req) {
  // try {
  const quiz = await QuizRepository.create(data);
  return quiz;
  // } catch (error) {
  //   throw new Error("NOTTCDTWCYDVYDBG");
  // }
}

module.exports = { createQuiz };
