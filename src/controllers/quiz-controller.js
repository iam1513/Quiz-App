const { quizService } = require("../services");

async function createQuiz(req, res) {
  try {
    console.log(req.userId);
    const user = await quizService.createQuiz({
      name: req.body.data.name,
      questions_list: req.body.data.questions_list,
      answers: req.body.data.answers,
      created_by: req.userId,
      is_published: req.body.data.is_published,
    });

    return res.json({
      success: true,
      message: "Successfully created a quiz",
      data: user,
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

module.exports = { createQuiz };
