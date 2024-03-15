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

async function signIn(req, res) {
  try {
    const { user, status, token } = await userService.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    if (status) {
      return res.json({
        success: true,
        message: "Successfully signed in",
        data: { email: req.body.email, token },
        error: {},
      });
    } else {
      return res.json({
        success: false,
        message: "Wrong password",
        data: { email: req.body.email },
        error: {},
      });
    }
  } catch (error) {
    console.log(
      "==============================================================================="
    );
    return res.json({
      success: false,
      message: "Internal server error",
      data: {},
      error: error,
    });
  }
}

module.exports = { createUser, getUser, signIn };
