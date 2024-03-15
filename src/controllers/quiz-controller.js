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

    // To get only the fields we wanted
    const filteredQuiz = {
      name: quiz.name,
      questions_list: quiz.questions_list,
      answers: quiz.answers,
    };

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

async function updateQuiz(req, res) {
  try {
    const quiz = await quizService.updateQuiz(req.params.id, req.body.data);
    const requestor = req.userId;
    const creator = quiz.created_by.toString();
    if (creator === requestor) {
      return res.json({
        success: true,
        message: "Successfully updated  quiz",
        data: quiz,
        error: {},
      });
    }
  } catch (error) {
    console.log("Only Owner can update the Quiz.");
    return res.json({
      success: false,
      message: "Unsuccesful while updating quiz",
      data: {},
      error: error,
    });
  }
}

async function deleteQuiz(req, res) {
  try {
    const quiz = await quizService.deleteQuiz(req.params.id);
    const requestor = req.userId;
    const creator = quiz.created_by.toString();
    if (creator === requestor) {
      return res.json({
        success: true,
        message: "Successfully deleted  quiz",
        data: null,
        error: {},
      });
    }
  } catch (error) {
    console.log("Only Owner can delete a Quiz");
    return res.json({
      success: false,
      message: "Unsuccesful while deleting quiz",
      data: {},
      error: error,
    });
  }
}

async function publishQuiz(req, res) {
  try {
    const quiz = await quizService.publishQuiz(req.body);

    return res.json({
      success: true,
      message: "Successfully published quiz",
      data: quiz,
      error: {},
    });
  } catch (error) {
    console.log("Only Owner can publish a Quiz");
    return res.json({
      success: false,
      message: "Unsuccesful while publishing quiz",
      data: {},
      error: error,
    });
  }
}

module.exports = { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz };
