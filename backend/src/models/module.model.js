const mongoose = require("mongoose");
const { Schema } = mongoose;

const moduleSchema = new Schema(
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
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true, // Creates an index on the 'course' field
    },
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
