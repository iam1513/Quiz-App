const { userRepository } = require("../repositories");
const bcrypt = require("bcryptjs");
const UserRepository = new userRepository();
const jwt = require("jsonwebtoken");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

async function signUp(data) {
  const email = data.email;

  const emailExists = await UserRepository.findByEmail({ email: email });

  if (emailExists) {
    // Proper status code
    throw new AppError(
      "Email already Exists",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  const password = data.password;
  const encryptedPassword = await bcrypt.hash(password, 9);
  try {
    const result = await UserRepository.create({
      email: email,
      password: encryptedPassword,
      name: data.name,
    });
    await result.save();
    return result;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of the user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signIn(data) {
  /**
   * get email
   * comparePassword
   * User authenticated
   */

  try {
    const email = data.email;
    const currentPassword = data.password;
    const user = await UserRepository.findByEmail({ email: email });

    const status = await bcrypt.compare(currentPassword, user.password);

    // TODO:
    // Sign a JWT token here and return with this function

    function generateJWT(user) {
      return jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        "cobra_secret",
        {
          expiresIn: "2h",
        }
      );
    }

    if (status) {
      const token = generateJWT(user);
      return {
        status,
        user,
        token,
      };
    } else {
      return {
        status: false,
        user: null,
        token: null,
      };
    }
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The User you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError("Wrong Password", StatusCodes.UNAUTHORIZED);
  }
}

async function getUser(id) {
  try {
    const user = await UserRepository.get(id);
    return user;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The User you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of the user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { signUp, signIn, getUser };
