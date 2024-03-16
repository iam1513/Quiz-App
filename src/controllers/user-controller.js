const { userService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
async function createUser(req, res) {
  try {
    const createdUser = await userService.signUp({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });

    SuccessResponse.data = createdUser;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getUser(req, res) {
  try {
    const user = await userService.getUser(req.params.id);
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
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
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createUser, getUser, signIn };