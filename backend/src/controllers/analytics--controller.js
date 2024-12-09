const CatchAsyncError = require("../middleware/catchAsyncError");
const Purchase = require("../models/purchase");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");

const getAnalytics = CatchAsyncError(async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    let purchases;

    if (startDate && endDate) {
      // Fetch purchases within the specified date range
      purchases = await Purchase.find({
        createdAt: { $gte: startDate, $lte: endDate },
      }).populate("courseId");
    } else {
      // Fetch all purchases if no date range is specified
      purchases = await Purchase.find().populate("courseId");
    }

    // Calculate total sales, total price, and course-wise revenue
    let totalSales = 0;
    let totalPrice = 0;
    const courseRevenue = {};

    purchases.forEach((purchase) => {
      totalSales += 1; // Assuming each purchase represents one sale
      totalPrice += purchase.amount;

      const { courseId, amount } = purchase;

      // Check if courseId is available and has a title
      if (courseId && courseId.title) {
        const courseTitle = courseId.title;

        // Aggregate revenue for each course
        if (courseTitle in courseRevenue) {
          courseRevenue[courseTitle] += amount;
        } else {
          courseRevenue[courseTitle] = amount;
        }
      }
    });

    let users;

    if (startDate && endDate) {
      users = await User.find({
        createdAt: { $gte: startDate, $lte: endDate },
        role: "student",
      });
    } else {
      users = await User.find({ role: "student" });
    }

    // const users = await User.find({ role: "student" });

    // Convert courseRevenue object to an array
    const courseRevenueArray = Object.keys(courseRevenue).map(
      (courseTitle) => ({
        course: courseTitle,
        revenue: courseRevenue[courseTitle],
      })
    );

    return res.status(200).json({
      success: true,
      data: {
        totalSales,
        totalPrice,
        totalStudents: users?.length,
        courseRevenue: courseRevenueArray,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  getAnalytics,
};
