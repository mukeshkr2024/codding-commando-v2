require("dotenv").config();
const User = require("../models/user.model");
const createActivationToken = require("../utils/generateActivationToken");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { generateToken } = require("../utils/jwt.js");
const sendSMS = require("../config/sendOTP.js");

// registration service
const registerUserService = async (userData) => {
  try {
    const { firstName, lastName, phone, email, password } = userData;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ErrorHandler("Invalid email format", 400);
    }

    // Validate phone format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      throw new ErrorHandler("Invalid phone number", 400);
    }

    // Convert email to lowercase for case-insensitive uniqueness
    const lowerCaseEmail = email.toLowerCase();

    // Check if email exists
    const emailExists = await User.findOne({ email: lowerCaseEmail });
    if (emailExists) {
      throw new ErrorHandler("Email already exists", 400);
    }

    // Check if phone number exists
    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      throw new ErrorHandler("Phone number already exists", 400);
    }

    const user = {
      firstName,
      lastName,
      phone,
      email: lowerCaseEmail, // Use the lowercase email
      password,
    };

    // Generate activation token and code
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    // Prepare data for email template
    const data = { user: { name: user.firstName }, activationCode };

    // sendSms to phone
    try {
      await sendSMS(phone, activationCode);
    } catch (error) {}

    // Send activation email
    try {
      await sendMail({
        email: user.email,
        subject: "Account Activation",
        template: "activation-mail.ejs",
        data,
      });

      return {
        success: true,
        user,
        activationToken: activationToken.token,
      };
    } catch (error) {
      console.log("Error: " + error);
      throw new ErrorHandler(error.message, 500);
    }
  } catch (error) {
    console.log("Error: " + error);
    throw new Error(error.message);
  }
};

// activate user service
const activateUserService = async (activationData) => {
  try {
    const { activationCode, activationToken } = activationData;

    //decode user
    const newUser = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

    //verify activation code
    if (newUser.activationCode !== activationCode) {
      throw new ErrorHandler("Invalid activation code ");
    }

    const { firstName, lastName, phone, email, password } = newUser.user;

    // check if user is already exists by email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new ErrorHandler("Email already exists");
    }

    // check if user is already exists by phone
    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      throw new ErrorHandler("Phone number already exists");
    }

    // create new user
    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    return user;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("OTP expired");
    } else {
      throw new Error(error.message);
    }
  }
};

// login service
const loginUserService = async (loginData) => {
  try {
    const { email, password } = loginData;

    // Validate presence of email and password
    if (!email || !password) {
      throw new ErrorHandler("Please enter email and password", 400);
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    // If user doesn't exist, throw an error
    if (!user) {
      throw new ErrorHandler("Invalid email or password", 401);
    }

    if (user?.isBlocked) {
      throw new ErrorHandler("Please contact to support team");
    }

    // Compare entered password with stored password
    const isPasswordMatch = await user.comparePassword(password);

    // If passwords don't match, throw an error
    if (!isPasswordMatch) {
      throw new ErrorHandler("Invalid email or password", 401);
    }

    // Return user and access token
    return { user, accessToken: generateToken(user._id) };
  } catch (error) {
    throw new ErrorHandler(error.message);
  }
};

module.exports = {
  registerUserService,
  activateUserService,
  loginUserService,
};
