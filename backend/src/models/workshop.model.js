const mongoose = require("mongoose");
const { Schema } = mongoose;

const workshopSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    joined_workshop: [
      {
        name: {
          type: String,
        },
        email: {
          type: String,
        },
        phone: {
          type: Number,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
