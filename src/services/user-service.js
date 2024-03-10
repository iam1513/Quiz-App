const { userRepository } = require("../repositories");

const UserRepository = new userRepository();
async function signUp(data) {
  const email = data.email;

  const emailExists = await UserRepository.findByEmail({ email: email });

  if (emailExists) {
    throw {
      message: "User already exits",
    };
  }

  try {
    const result = await UserRepository.create(data);
    return result;
  } catch (error) {
    throw error;
  }
}

async function getUser(id) {
  try {
    const user = await UserRepository.get(id);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { signUp, getUser };
