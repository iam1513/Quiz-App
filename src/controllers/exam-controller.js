const { examService } = require("../services");

async function attemptQuiz(req, res) {
  try {
    const quiz = await examService.attemptQuiz(req.params.id);
    console.log("QUIZ CONT : ", quiz);
    const filteredQuiz = {
      name: quiz.name,
      questions_list: quiz.questions_list,
      is_published: quiz.is_published,
    };

    return res.json({
      success: true,
      message: "Successfully got a quiz",
      data: filteredQuiz,
      error: {},
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Unsuccesful while getting a quiz",
      data: {},
      error: error,
    });
  }
}

async function submitQuiz(req, res) {
  try {
    const result = await examService.submitQuiz(req.body.data, req.userId);
    const filteredResult = {
      score: result.score,
      total: result.total,
      result_id: result._id,
    };

    return res.json({
      success: true,
      message: "Successfully Submitted the quiz",
      data: filteredResult,
      error: {},
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Unsuccesful while getting a quiz",
      data: {},
      error: error,
    });
  }
}

module.exports = { attemptQuiz, submitQuiz };
