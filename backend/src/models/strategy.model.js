const mongoose = require("mongoose");
const { Schema } = mongoose;

const strategySchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: String,
    description: {
      type: String,
    },
    imageUrl: String,
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Strategy = mongoose.model("Strategy", strategySchema);

module.exports = Strategy;
