const CrudRepository = require("./crud-repository");
const Result = require("../models/result-model");

class resultRepository extends CrudRepository {
  constructor() {
    super(Result);
  }
}

module.exports = resultRepository;