const mongoose = require("mongoose");
const { Schema } = mongoose;

const keyObjectivesSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },
  },
  {
    timestamps: true,
  }
);

const KeyObjectives = mongoose.model("keyObjectives", keyObjectivesSchema);

module.exports = KeyObjectives;
