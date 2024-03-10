class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      console.log("Something went wrong in Crud repo");
      throw error;
    }
  }

  async get(id) {
    try {
      const response = await this.model.findById(id);
      return response;
    } catch (error) {
      console.log("Something went wrong in Crud repo");
      throw error;
    }
  }

  // async find(data) {
  //   try {
  //     const response = await this.model.findOne(data);
  //     return response;
  //   } catch (error) {
  //     console.log("Something went wrong in Crud repo");
  //     throw error;
  //   }
  // }

  async destroy(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in Crud repo");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data);
      return result;
    } catch (error) {
      console.log("Something went wrong in Crud repo");
      throw error;
    }
  }
}

module.exports = CrudRepository;
