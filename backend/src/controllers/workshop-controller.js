// Import required modules
require("dotenv").config();
const RazorPay = require("razorpay");
const CatchAsyncError = require("../middleware/catchAsyncError");
const Workshop = require("../models/workshop.model");
const ErrorHandler = require("../utils/ErrorHandler");
const shortid = require("shortid");
const crypto = require("crypto");
const WorkshopRegister = require("../models/workshop.register.model");
const Purchase = require("../models/purchase");
const sendMail = require("../utils/sendMail");

// Function to get workshop by name
const getByName = CatchAsyncError(async (req, res, next) => {
  const name = req.params.name;

  try {
    const workshop = await Workshop.findOne({ title: name }).select(
      "-joined_workshop -createdAt -updatedAt"
    );

    if (!workshop) {
      return next(new ErrorHandler("Workshop not found", 404));
    }

    return res.status(200).json({
      success: true,
      workshop,
    });
  } catch (error) {
    return next(new ErrorHandler("Server error", 500));
  }
});

// Function to create order payment
const createOrderPayment = CatchAsyncError(async (req, res, next) => {
  const { phone, name, email } = req.body;
  const workshopName = req.params.name;

  try {
    if (!phone || !name || !email) {
      return next(new ErrorHandler("Please enter required details", 400));
    }

    const workshop = await Workshop.findOne({ title: workshopName });

    if (!workshop) {
      return next(new ErrorHandler("Workshop not found", 404));
    }

    console.log("RAZORPAY_API_KEY_SECRET", RAZORPAY_API_KEY_SECRET);
    console.log("RAZORPAY_API_SECRET_KEY", RAZORPAY_API_SECRET_KEY);

    const instance = new RazorPay({
      key_id: process.env.RAZORPAY_API_KEY_SECRET,
      key_secret: process.env.RAZORPAY_API_SECRET_KEY,
    });

    const payment_capture = 1;
    const amount = workshop.price * 100;
    const currency = "INR";
    const options = {
      amount: amount.toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
      notes: {
        paymentFor: `Workshop ${workshop.title}`,
        name,
        email,
        phone,
      },
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      message: "Order processed successfully",
      order,
      name,
      phone,
      email,
      price: workshop.price,
      amount: workshop.price,
    });
  } catch (error) {
    return next(new ErrorHandler("Server error", 500));
  }
});

// Handle verification of order
const handleVerifyOrder = CatchAsyncError(async (req, res, next) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    amount,
    name,
    email,
    phone,
  } = req.body;

  const workshopName = req.params.name;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return next(new ErrorHandler("Payment verification failed", 400));
    }

    const workshop = await Workshop.findOneAndUpdate(
      { title: workshopName },
      {
        $push: {
          joined_workshop: {
            name,
            email,
            phone,
          },
        },
      },
      { new: true }
    );

    const userdetails = await Purchase.findOne({ email });

    await Purchase.create({
      amount,
      method: "workshop",
      courseId: null,
      userId: userdetails?._id || null,
    });

    const mailData = {
      user: {
        name,
      },
    };

    const template = "Thankyou-mail.ejs";

    try {
      await sendMail({
        email: email,
        subject: "Thank you for registering ",
        template,
        data: mailData,
      });
    } catch (error) {
      throw new Error(error?.message, 500);
    }

    return res.status(200).json({
      success: true,
      message: "Payment success",
    });
  } catch (error) {
    return next(new ErrorHandler("Server error", 500));
  }
});

// Register for workshop
const registerWorkshop = CatchAsyncError(async (req, res, next) => {
  const { email, name, lastName, phone, profession, workshop } = req.body;

  try {
    if (!email || !phone || !workshop) {
      return next(new ErrorHandler("Please enter all required fields", 400));
    }

    const exists = await WorkshopRegister.findOne({
      email: email.toLowerCase(),
    });

    if (exists) {
      return next(new ErrorHandler("You have already registered", 400));
    }

    const response = await WorkshopRegister.create({
      email: email.toLowerCase(),
      firstName: name,
      lastName: lastName || null,
      phone,
      profession: profession || null,
      workshop,
    });

    return res.status(200).json({
      success: true,
      message: "Registered successfully",
      data: {
        name: `${response?.firstName}`,
        email: response?.email,
        phone: response?.phone,
      },
    });
  } catch (error) {
    return next(new ErrorHandler("Server error", 500));
  }
});

// Get all workshop details
const getWorkshopDetails = CatchAsyncError(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  try {
    let results;

    if (startDate && endDate) {
      results = await WorkshopRegister.find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
        .sort({ createdAt: -1 })
        .exec();
    } else {
      results = await WorkshopRegister.find({}).sort({ createdAt: -1 }).exec();
    }

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      workshops: results,
    });
  } catch (error) {
    return next(new ErrorHandler("Server error", 500));
  }
});

module.exports = {
  getByName,
  createOrderPayment,
  handleVerifyOrder,
  registerWorkshop,
  getWorkshopDetails,
};
