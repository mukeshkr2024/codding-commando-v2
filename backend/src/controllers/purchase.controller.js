require("dotenv").config();
const CatchAsyncError = require("../middleware/catchAsyncError");
const Course = require("../models/course.model");
const User = require("../models/user.model");
const { isValidObjectId } = require("../utils");
const ErrorHandler = require("../utils/ErrorHandler");
const createActivationToken = require("../utils/generateActivationToken");
const jwt = require("jsonwebtoken");
const RazorPay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
const Installment = require("../models/installment.model");
const PaymentDetail = require("../models/payment-detail.model");
const Purchase = require("../models/purchase");
const { generateToken } = require("../utils/jwt");
const sendSMS = require("../config/sendOTP");
const sendMail = require("../utils/sendMail");

function generatePassword() {
  const length = 8;
  const charset =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

const getCourseDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;

    if (!isValidObjectId(courseId)) {
      return next(new ErrorHandler("Invalid course id", 400));
    }

    const course = await Course.findById(courseId)
      .select("banner title paymentDetail")
      .populate({
        path: "paymentDetail",
        select: "fullPrice installmentPrice",
      });

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Course Detail fetched",
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const handleCompleteOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const { phone, email } = req.body;

    if (!phone || !email) {
      return next(new ErrorHandler("Please enter both phone and email", 400));
    }

    const updatedEmail = email.toLowerCase();
    const passwordGenerated = generatePassword();

    const newUser = {
      firstName: "Guest",
      lastName: "User",
      phone,
      email: updatedEmail,
      password: passwordGenerated,
    };

    const activationToken = createActivationToken(newUser);
    const activationCode = activationToken.activationCode;

    // send activation mail with code

    const data = { user: { name: "Guest" }, activationCode };

    try {
      await sendSMS(phone, activationCode);
    } catch (error) {}

    try {
      await sendMail({
        email: email,
        subject: "Account Verification",
        template: "activation-mail.ejs",
        data,
      });
    } catch (error) {
      console.error("error in mail", error);
    }

    return res.status(200).json({
      success: true,
      message: "Verification code sent",
      token: activationToken.token,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const handleCreateOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const { activationCode, activationToken } = req.body;

    const userInfo = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

    // verify code
    if (userInfo.activationCode !== activationCode) {
      throw new ErrorHandler("Invalid OTP", 400);
    }

    const { firstName, lastName, phone, email, password } = userInfo.user;

    // find user by email or phone
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });

    let user;

    if (userExists) {
      user = userExists;
    } else {
      user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone,
      });

      const data = {
        username: user?.email,
        temporaryPassword: password,
      };

      try {
        await sendMail({
          email: user.email,
          subject: "Login Credentials",
          template: "user-credential.ejs",
          data,
        });
      } catch (error) {}
    }

    // for create order payement
    const courseId = req.params.courseId;
    const method = req.body.method;

    if (!isValidObjectId(courseId)) {
      throw new Error("Invalid course Id");
    }

    if (method !== "fullPrice" && method !== "installment") {
      throw new Error("Something went wrong , please try again later");
    }

    if (!user) {
      throw new Error("Unauthorized ");
    }

    const course = await Course.findById({ _id: courseId });

    if (!course) {
      throw new Error("Course not found");
    }

    if (method === "fullPrice") {
      const installmentExist = await Installment.findOne({
        userId: user.id,
        courseId,
      });

      if (installmentExist && installmentExist.installmentNumber !== 3) {
        throw new Error(
          `Please do the ${
            installmentExist?.installmentNumber + 1
          } installment payment `
        );
      }

      const userEnrolled = course.enrollments.some(
        (enrollment) => enrollment.student.toString() == user.id
      );

      if (userEnrolled) {
        throw new Error("You have already enrolled in this course");
      }

      const enrolledALready = user.enrollments.some(
        (enrollment) => enrollment.courseId.toString() === courseId
      );

      if (enrolledALready) {
        throw new Error("You have already enrolled in this course");
      }
    } else {
      const enrolledALready = user.enrollments.some(
        (enrollment) =>
          enrollment.courseId.toString() === courseId &&
          enrollment.paymentType === "fullPrice"
      );

      if (enrolledALready) {
        throw new Error("You have already enrolled in this course");
      }

      const installmentExist = await Installment.findOne({
        userId: user.id,
        courseId,
      });

      if (installmentExist && installmentExist.installmentNumber >= 3) {
        throw new Error("You have already enrolled in this course");
      }
    }

    const paymentDetail = await PaymentDetail.findById({
      _id: course.paymentDetail,
      course: course._id,
    });

    // razorpay instance
    const instance = new RazorPay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    let price;

    if (method === "fullPrice") {
      price = paymentDetail?.fullPrice;
    } else {
      price = paymentDetail?.installmentPrice;
    }

    const payment_capture = 1;
    const amount = price * 100;
    const currency = "INR";
    const options = {
      amount: amount.toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
      notes: {
        paymentFor: course.title,
        userId: user.id,
        courseId: course.id,
        imageUrl: course.imageUrl,
        description: course.title,
        method: method,
      },
    };

    const order = await instance.orders.create(options);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
      phone: user?.phone,
      price,
      method,
      userId: user?._id,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const handleVerifyOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      method,
      userId,
    } = req.body;

    const courseId = req.params.courseId;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Failed to create payment",
      });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    const userEnrollmentExists = user.enrollments.some(
      (enrollment) => enrollment.courseId.toString() === courseId
    );

    const courseEnrollmentExists = course.enrollments.some(
      (enrollment) => enrollment.student.toString() === user._id.toString()
    );

    if (!userEnrollmentExists) {
      user.enrollments.push({ courseId, paymentType: method });
    }

    if (!courseEnrollmentExists) {
      course.enrollments.push({ student: user._id });
    }

    if (method !== "fullPrice") {
      const installmentExist = await Installment.findOne({
        userId: user._id,
        courseId,
      });

      const number = installmentExist?.installmentNumber
        ? installmentExist.installmentNumber + 1
        : 1;

      if (installmentExist) {
        installmentExist.installmentNumber = number;
        await installmentExist.save();
      } else {
        await Installment.create({
          courseId,
          userId: user?._id,
          installmentNumber: number,
        });
      }
    }

    await course.save();

    const data = {
      courseId,
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      paymentType: method,
      amount,
      // installmentNumber: number, // TODO :
    };

    user.paymentHistory.push(data);
    await user.save();

    await Purchase.create({
      courseId,
      userId: user._id,
      amount,
      method,
    });

    return res.status(200).json({
      success: true,
      message: "Payment created successfully",
      accessToken: generateToken(user._id),
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, error, 400));
  }
});

module.exports = {
  getCourseDetails,
  handleCompleteOrder,
  handleCreateOrder,
  handleVerifyOrder,
};
