const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, // To make searching in MongoDB easy
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
