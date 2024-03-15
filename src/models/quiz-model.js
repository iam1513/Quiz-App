const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions_list: [
      {
        question_number: Number,
        question: String,
        options: {},
      },
    ],
    answers: {},

    created_by: {
      type: mongoose.Types.ObjectId,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
