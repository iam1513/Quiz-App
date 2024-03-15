const { quizRepository } = require("../repositories");
const QuizRepository = new quizRepository();

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
    return quiz;
  } catch (error) {
    throw new Error("Error in Quiz Service");
  }
}

async function updateQuiz(id, data) {
  try {
    const updatedQuiz = await QuizRepository.update(id, data);
    return updatedQuiz;
  } catch (error) {
    throw new Error("Error in Quiz Service");
  }
}

async function deleteQuiz(id) {
  try {
    const quiz = await QuizRepository.destroy(id);
    return quiz;
  } catch (error) {
    throw new Error("Error in Quiz Service");
  }
}

module.exports = { createQuiz, getQuiz, updateQuiz, deleteQuiz };
