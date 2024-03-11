const { userRepository } = require("../repositories");
const bcrypt = require("bcryptjs");
const UserRepository = new userRepository();
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
    console.log("Inside services sign in");
    const email = data.email;
    const currentPassword = data.password;
    const user = await UserRepository.findByEmail({ email: email });
    console.log(user);
    if (!user) {
      throw {
        message: "No user found with this Email",
      };
    }

    const status = await bcrypt.compare(currentPassword, user.password);
    // TODO:
    // Sign a JWT token here and return with this function

    if (status) {
      return {
        status,
        user,
      };
    } else {
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { signUp, signIn };
