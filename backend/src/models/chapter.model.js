const mongoose = require("mongoose");
const { Schema } = mongoose;

const chapterSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    position: {
      type: Number,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    videoUrl: {
      type: String,
    },
    videoDuration: {
      type: Number,
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: "Module",
      required: true, // Consider requiring this if chapters cannot exist without a module
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true, // Keeping this if direct course reference is needed
      required: true,
    },
    isLive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    liveUrl: {
      type: String,
    },
    downloadUrl: {
      type: String,
    },
    live_date: {
      type: String,
    },
    live_time: {
      type: String,
    },
    UsersProgress: [
      {
        type: Schema.Types.ObjectId,
        ref: "UsersProgress",
      },
    ],
    mentors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Mentor",
      },
    ],
    quiz_questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "QuizQuestion",
      },
    ],
    keyObjectives: [
      {
        type: Schema.Types.ObjectId,
        ref: "keyObjectives",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
