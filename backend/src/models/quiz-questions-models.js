const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Define the Option schema
const optionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "QuizQuestion",
    required: true,
  },
});

// Create the Option model
const Option = model("Option", optionSchema);

// Define the QuizQuestion schema
const quizQuestionSchema = new Schema(
  {
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },
    title: {
      type: String,
      required: true,
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create the QuizQuestion model
const QuizQuestion = model("QuizQuestion", quizQuestionSchema);

// Export the models
module.exports = {
  QuizQuestion,
  Option,
};
