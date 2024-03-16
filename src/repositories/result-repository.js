const CrudRepository = require("./crud-repository");
const Result = require("../models/result-model");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class resultRepository extends CrudRepository {
  constructor() {
    super(Result);
  }

  async resultQuizzes(userId) {
    const results = await Result.find({ userId }); // Filter by userId
    if (!results) {
      throw new AppError("Not able to find the email.", StatusCodes.NOT_FOUND);
    }
    return results;
  }
}

module.exports = resultRepository;
