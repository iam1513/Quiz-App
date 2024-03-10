const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://iam1513:atlas1513@cluster0.gvgdwxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = { connect };
