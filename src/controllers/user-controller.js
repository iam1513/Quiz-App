const { userService } = require("../services");
async function createUser(req, res) {
  try {
    const createdUser = await userService.signUp({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });

    return res.status(200).json({
      success: true,
      message: "Request Successfully completed",
      data: createdUser,
      error: {},
    });
  } catch (error) {
    console.log("Something went wrong in user controller");
    return res.status(500).json({
      success: false,
      message: "Request completion unsuccessful",
      data: {},
      error: error,
    });
  }
}

async function getUser(req, res) {
  try {
    const user = await userService.getUser(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Request Successfully completed",
      data: user,
      error: {},
    });
  } catch (error) {
    console.log("Something went wrong in user controller");
    return res.status(500).json({
      success: false,
      message: "Request completion unsuccessful",
      data: {},
      error: error,
    });
  }
}

module.exports = { createUser, getUser };
