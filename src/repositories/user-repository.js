const CrudRepository = require("./crud-repository");
const User = require("../models/user-model");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class userRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(data) {
    const checkedEmail = await User.findOne(data);
    if (!checkedEmail) {
      throw new AppError(
        "Not able to find the email.",
        StatusCodes.NOT_FOUND
      );
    }
    return checkedEmail;
  }
}

module.exports = userRepository;
