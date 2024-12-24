const { isValidObjectId } = require("mongoose");
const CatchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../models/user.model.js");
const {
  registerUserService,
  activateUserService,
  loginUserService,
} = require("../services/user-service.js");
const ErrorHandler = require("../utils/ErrorHandler");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail.js");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// @user registration
// @/api/v1/users/register
const registerUser = CatchAsyncError(async (req, res, next) => {
  try {
    const response = await registerUserService(req.body);
    return res.status(201).json({
      success: true,
      message: `Please check your email or phone to activate your account `,
      token: response.activationToken,
      user: response.user,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// @user activation
// @/api/v1/users/activate
const activateUser = async (req, res, next) => {
  try {
    const user = await activateUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

// @user activation
// @/api/v1/users/login
const loginUser = async (req, res, next) => {
  try {
    const { user, accessToken } = await loginUserService(req.body);
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        accessToken,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

const getUserInfoController = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching User Details",
    });
  }
};

// update user profile
const updateProfileController = async (req, res) => {
  try {
    const user = req.user;

    const updatedUser = await User.findByIdAndUpdate();

    res.status(201).send({
      success: true,
      message: "User Profile Updated",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "User Profile Update issue",
      error,
    });
  }
};

const getAllStudents = CatchAsyncError(async (req, res, next) => {
  try {
    const { startDate, endDate, page = 1, limit = 10, search } = req.query;

    console.log("search", search);

    const query = { role: "student" };

    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const students = await User.find(query)
      .select("firstName lastName email phone createdAt")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalStudents = await User.countDocuments(query);

    console.log("totalStudents", totalStudents);

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      students,
      totalStudents,
      totalPages: Math.ceil(totalStudents / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const downloadStudentsData = CatchAsyncError(async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { role: "student" };

    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const students = await User.find(query)
      .select("firstName lastName email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json(students);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// delete user
const deleteUser = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!isValidObjectId(userId)) {
      throw new ErrorHandler("Inavalid user id ", 400);
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get single user
const getUserById = CatchAsyncError(async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    if (!isValidObjectId(studentId)) {
      throw new ErrorHandler("Inavalid user id ", 400);
    }

    const user = await User.findById(studentId)
      .populate({
        path: "enrollments.courseId",
        select: "title",
      })
      .populate({
        path: "paymentHistory.courseId",
        select: "title",
      });

    if (!user) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const getUserByToken = CatchAsyncError(async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      user: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phone: user?.phone,
        role: user?.role,
        avatar: user?.avatar,
        enrolledCourses: user?.enrollments,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const blockUser = CatchAsyncError(async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    if (!isValidObjectId(studentId)) {
      throw new ErrorHandler("Invalid user id", 400);
    }

    const user = await User.findByIdAndUpdate(
      studentId,
      { isBlocked: true },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User blocked successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const unblockUser = CatchAsyncError(async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    if (!isValidObjectId(studentId)) {
      throw new ErrorHandler("Invalid user id", 400);
    }

    const user = await User.findByIdAndUpdate(
      studentId,
      { isBlocked: false },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User unblocked successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const resetPassword = CatchAsyncError(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw next(new ErrorHandler("Email is required"), 400);
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      console.log("User not found");
      throw next(new ErrorHandler("User not found"), 404);
    }

    // create a reset token and expiry
    user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetURL = `https://codingcommando.in/reset-password?token=${user.resetPasswordToken}`;

    // send a mail to the user
    const data = { name: user.firstName, resetURL };
    const template = `reset-password.ejs`;

    try {
      const response = await sendMail({
        email: user.email,
        subject: "Reset Password",
        template,
        data,
      });
    } catch (error) {
      console.log(error);
    }

    return res.status(200).json({
      success: true,
      message: "Reset Link send successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 400));
  }
});

const changePassword = CatchAsyncError(async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      throw new Error("Token is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Password reset token is invalid or has expired.");
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const updateProfile = CatchAsyncError(async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("Unauthorized");
    }

    if (req.body.password) {
      // Hash the password
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: req?.body,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "Updated user successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const verifyPassword = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      throw new Error("Password is not provided");
    }

    const user = await User.findById(userId);

    const isPasswordMatch = await user.comparePassword(password);
    if (isPasswordMatch) {
      return res.status(200).json({
        success: true,
      });
    } else {
      throw new Error("Password do not match");
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const deleteProfilePic = CatchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    user.avatar = null;

    await user.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const getUserPurchaseDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const user = req.user;

    const details = await User.findById(user?._id)
      .select("paymentHistory")
      .populate({
        path: "paymentHistory.courseId",
        select: "title description",
      });

    return res.status(200).json({
      success: true,
      details,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

module.exports = {
  registerUser,
  activateUser,
  loginUser,
  getAllStudents,
  getUserById,
  getUserByToken,
  blockUser,
  unblockUser,
  updateProfileController,
  getUserInfoController,
  deleteUser,
  resetPassword,
  changePassword,
  updateProfile,
  verifyPassword,
  deleteProfilePic,
  getUserPurchaseDetails,
  downloadStudentsData,
};
