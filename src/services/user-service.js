const { userRepository } = require("../repositories");
const bcrypt = require("bcryptjs");
const UserRepository = new userRepository();
const jwt = require("jsonwebtoken");
async function signUp(data) {
  const email = data.email;

  const emailExists = await UserRepository.findByEmail({ email: email });

  if (emailExists) {
    throw {
      message: "User already exits",
    };
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
    throw error;
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
    if (!user) {
      throw {
        message: "No user found with this Email",
      };
    }

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
      console.log(token);
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
    return {
      success: false,
      message: "Wrong Password",
      data: {},
      error: error,
    };
  }
}

async function getUser(id) {
  try {
    const user = await UserRepository.get(id);
    console.log(user);
    return user;
  } catch (error) {
    console.log("+=====================================");
    throw error;
  }
}

module.exports = { signUp, signIn, getUser };
