const mongoose = require("mongoose");
const { Schema } = mongoose;

const enrollmentSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseType: {
    type: String,
    enum: ["Paid", "Free"],
    default: "Paid",
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  transactionId: {
    type: String,
    required: function () {
      return this.courseType === "Paid";
    },
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
