const { Schema, default: mongoose } = require("mongoose");

const registerWorkshop = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
    },
    workshop: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WorkshopRegister = mongoose.model("workshop_register", registerWorkshop);

module.exports = WorkshopRegister;
