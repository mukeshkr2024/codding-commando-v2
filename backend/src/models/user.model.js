require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value);
        },
        message: "Invalid email address",
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number! `,
      },
      required: [true, "User phone number required"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "student", "instructor"],
      default: "student",
    },
    avatar: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: String,
    },
    enrollments: [
      {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        paymentType: {
          type: String,
        },
        enrolledAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    paymentHistory: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        payment_id: {
          type: String,
        },
        order_id: {
          type: String,
        },
        paymentType: {
          type: String,
        },
        amount: {
          type: Number,
        },
        installmentNumber: {
          type: Number,
          default: 0,
        },
        purchasedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
  return next();
});

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
