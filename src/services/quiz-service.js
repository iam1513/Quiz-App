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
    if (quiz.is_published) {
      console.log("Cannot update Published Quiz.");
      throw new Error("Cannot update Published Quiz.");
    }
    return quiz;
  } catch (error) {
    throw new Error("Error in Quiz Service");
  }
}

async function updateQuiz(id, data) {
  try {
    const updatedQuiz = await QuizRepository.update(id, data);
    if (updatedQuiz.is_published) {
      throw new Error("Cannot update Published Quiz.");
    }
    return updatedQuiz;
  } catch (error) {
    throw new Error("Error in Quiz Service");
  }
}

async function deleteQuiz(id) {
  try {
    const quiz = await QuizRepository.destroy(id);
    if (quiz.is_published) {
      throw new Error("Cannot delete Published Quiz.");
    }
    return quiz;
  } catch (error) {
    throw new Error("Error in Quiz Service");
  }
}

async function publishQuiz(data) {
  try {
    const quizId = data.quizId;
    const quiz = await QuizRepository.publish(quizId);

    if (!quiz) {
      throw new Error("NO QUIZ FOUND");
    }

    quiz.is_published = true;

    return quiz;
  } catch (error) {
    throw error;
  }
}

module.exports = { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz };
