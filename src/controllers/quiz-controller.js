const { quizService } = require("../services");

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

    return res.json({
      success: true,
      message: "Successfully created a quiz",
      data: quiz,
      error: {},
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Unsuccesful while creating a quiz",
      data: {},
      error: error,
    });
  }
}

async function getQuiz(req, res) {
  try {
    const quiz = await quizService.getQuiz(req.params.id);
    return res.json({
      success: true,
      message: "Successfully got a quiz",
      data: quiz,
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

module.exports = { createQuiz, getQuiz };
