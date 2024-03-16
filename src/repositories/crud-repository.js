const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    console.log("IN CRUD REPO");
    const response = await this.model.create(data);
    return response;
  }

  async get(id) {
    const response = await this.model.findById(id);
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
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
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return result;
  }
  catch(error) {}

  async update(id, data) {
    const result = await this.model.findByIdAndUpdate(id, data);
    if (!result) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return result;
  }
}

module.exports = CrudRepository;
