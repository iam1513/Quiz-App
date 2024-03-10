const CrudRepository = require("./crud-repository");
const User = require("../models/user-model");
class userRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(data) {
    try {
      const checkedEmail = await User.findOne(data);
      return checkedEmail;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = userRepository;
