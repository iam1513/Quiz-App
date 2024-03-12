const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB = process.env.DB;

const connect = async () => {
  await mongoose.connect(DB);
};

module.exports = { connect };
