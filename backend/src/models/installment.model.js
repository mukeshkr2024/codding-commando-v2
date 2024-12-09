const mongoose = require("mongoose");
const { Schema } = mongoose;

const installmentSchema = new Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    installmentNumber: {
      type: Number,
      default: 1,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Installment = mongoose.model("Installment", installmentSchema);

module.exports = Installment;
