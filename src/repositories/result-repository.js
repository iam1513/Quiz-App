const CrudRepository = require("./crud-repository");
const Result = require("../models/result-model");

class resultRepository extends CrudRepository {
  constructor() {
    super(Result);
  }

  async resultQuizzes(userId) {
    try {
      const results = await Result.find({ userId }); // Filter by userId
      return results;
    } catch (error) {
      console.log("Something went wrong in result repo");
      throw error;
    }
  }
}

module.exports = resultRepository;
