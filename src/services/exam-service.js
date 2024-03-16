const { quizRepository, resultRepository } = require("../repositories");
const QuizRepository = new quizRepository();
const ResultRepository = new resultRepository();

async function attemptQuiz(id) {
  try {
    const quiz = await QuizRepository.get(id);
    console.log("QUIZ : ", quiz);
    if (!quiz) {
      console.log("No quiz with the id found.");
      throw new Error("No quiz with the id found.");
    }

    if (!quiz.is_published) {
      console.log("Quiz not published.");
      throw new Error("No quiz with the id found.");
    }

    return quiz;
  } catch (error) {
    console.log("IN EXAM SERVICE");
    throw error;
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

    console.log(Result);

    return result;
  } catch (error) {
    console.log("Error in SUBMIT QUIZ SERVICES");
    throw new Error("Error in SUBMIT QUIZ SERVICES");
  }
}

module.exports = { attemptQuiz, submitQuiz };
