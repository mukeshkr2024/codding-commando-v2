import { enrollmentRouter } from "../routes/v1/enrollment.routes";
import ErrorHandler from "../utils/ErrorHandler";

const getAllEnrollments = CatchAsyncError(async (req, res, next) => {
  try {
    const enrollments = await enrollmentRouter.find({});
    res.status(200).json({ enrollments });
  } catch (error) {
    return next(new ErrorHandler(error, error, 400));
  }
});

module.exports = {
  getAllEnrollments,
};
