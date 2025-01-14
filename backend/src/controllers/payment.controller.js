require("dotenv").config();
const CatchAsyncError = require("../middleware/catchAsyncError");
const PaymentDetail = require("../models/payment-detail.model");
const ErrorHandler = require("../utils/ErrorHandler");
const RazorPay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
const Course = require("../models/course.model");
const User = require("../models/user.model");
const Purchase = require("../models/purchase");
const Installment = require("../models/installment.model");

const getPaymentDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const paymentDetail = await PaymentDetail.findOne({
      course: courseId,
    });

    return res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      paymentDetail,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updatePaymentDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const data = req.body;

    const payment = await PaymentDetail.findOneAndUpdate(
      { course: courseId },
      { $set: data },
      { new: true, lean: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      payment,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createPaymentOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const user = req.user;
    const method = req.body.method;

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
        userId: req.user.id,
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
        userId: req.user.id,
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

    if (!process.env.RAZORPAY_API_KEY_SECRET) {
      throw new Error("Razorpay key not found");
    }

    if (!process.env.RAZORPAY_API_SECRET_KEY) {
      throw new Error("Razorpay secret not found");
    }

    console.log(process.env.RAZORPAY_API_KEY_SECRET);
    console.log(process.env.RAZORPAY_API_SECRET_KEY);

    // razorpay instance
    const instance = new RazorPay({
      key_id: process.env.RAZORPAY_API_KEY_SECRET,
      key_secret: process.env.RAZORPAY_API_SECRET_KEY,
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
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const verifyPaymentOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      method,
    } = req.body;

    const courseId = req.params.courseId;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    console.log("body", body);
    console.log("RAZORPAY_API_SECRET_KEY", process.env.RAZORPAY_API_SECRET_KEY);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET_KEY)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    console.log("isAuthentic", isAuthentic);

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Failed to create payment",
      });
    }

    const user = await User.findById(req.user.id);
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
        userId: req.user.id,
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
          userId: req.user.id,
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
    });
  } catch (error) {
    console.log("Errror verifying ", error);

    return next(new ErrorHandler(error.message, error, 400));
  }
});

const getAllPuchase = CatchAsyncError(async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};

    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const purchases = await Purchase.find(query)
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "firstName email",
      })
      .populate({
        path: "courseId",
        select: "title",
      });

    const results = purchases.map((purchase) => ({
      name: purchase.userId ? purchase.userId.firstName : null,
      email: purchase.userId ? purchase.userId.email : null,
      amount: purchase?.amount || null,
      courseTitle: purchase.courseId ? purchase.courseId.title : null,
      createdAt: purchase.createdAt,
      method: purchase.method,
    }));

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  updatePaymentDetails,
  getPaymentDetails,
  createPaymentOrder,
  verifyPaymentOrder,
  getAllPuchase,
};
