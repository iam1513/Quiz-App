const CrudRepository = require("./crud-repository");
const Quiz = require("../models/quiz-model");

class quizRepository extends CrudRepository {
  constructor() {
    super(Quiz);
  }
}

module.exports = quizRepository;
