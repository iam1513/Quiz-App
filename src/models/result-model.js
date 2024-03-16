const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    quizId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;
