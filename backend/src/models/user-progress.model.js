const { Schema, default: mongoose } = require("mongoose");

const userProgressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },
    is_video_completed: {
      type: Boolean,
      default: false,
    },
    is_quiz_completed: {
      type: Boolean,
      default: false,
    },
    quiz_score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UserProgress = mongoose.model("UsersProgress", userProgressSchema);

module.exports = UserProgress;
