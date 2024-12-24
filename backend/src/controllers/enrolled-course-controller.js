const CatchAsyncError = require("../middleware/catchAsyncError");
const Chapter = require("../models/chapter.model");
const Course = require("../models/course.model");
const Enrollment = require("../models/enrollement.model");
const UserProgress = require("../models/user-progress.model");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");

const getEnrolledCourseDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .populate("modules")
      .select("modules");

    const modules = course?.modules;

    return res.status(200).json({
      success: true,
      message: "Course details",
      modules,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId } = req.params;

    // Fetch the course with the populated modules and chapters
    const course = await Course.findById(courseId)
      .select("modules")
      .populate({
        path: "modules",
        select: "chapters title",
        match: { isPublished: true },
        populate: {
          path: "chapters",
          select:
            "title isLive liveUrl UsersProgress videoUrl videoDuration quiz_questions",
          match: { isPublished: true },
          populate: {
            path: "UsersProgress",
            select:
              "userId chapterId is_video_completed quiz_score is_quiz_completed",
          },
        },
      });

    // Transform the course data to include `isCompleted` and remove `UsersProgress`
    const transformedCourse = {
      ...course._doc,
      modules: course.modules.map((module) => ({
        ...module._doc,
        chapters: module.chapters.map((chapter) => {
          const userProgress = chapter.UsersProgress.find(
            (progress) => progress.userId.toString() === req.user._id.toString()
          );
          return {
            _id: chapter._id,
            title: chapter.title,
            isLive: chapter.isLive,
            liveUrl: chapter.liveUrl,
            is_video_completed: userProgress
              ? userProgress.is_video_completed
              : false,
            is_quiz_completed: userProgress
              ? userProgress?.is_quiz_completed
              : false,
            quiz_score: userProgress ? userProgress.quiz_score : 0,
            videoDuration: chapter.videoDuration,
            quiz_questions: chapter.quiz_questions?.length || 0,
          };
        }),
      })),
    };

    return res.status(200).json({
      success: true,
      message: "Success",
      course: transformedCourse,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getLessionDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId, moduleId, lessionId } = req.params;

    const lesson = await Chapter.findOne({
      _id: lessionId,
      module: moduleId,
      course: courseId,
      isPublished: true,
    })
      .populate({
        path: "mentors",
        select: "name description imageUrl additionInfo",
      })
      .populate({ path: "keyObjectives", select: "description" })
      .select("-position -isPublished -module -course -UsersProgress");

    return res.status(200).json({
      lesson,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const chapterProgress = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId, moduleId, chapterId } = req.params;
    const { is_video_completed } = req.body;

    // Find the user's progress for the specified chapter
    let progress = await UserProgress.findOne({
      userId: req.user.id,
      chapterId: chapterId,
    });

    if (progress) {
      progress.is_video_completed = is_video_completed;
      await progress.save();
    } else {
      // Create new progress if none exists
      progress = await UserProgress.create({
        userId: req.user.id,
        chapterId: chapterId,
        is_video_completed: is_video_completed,
      });

      const chapter = await Chapter.findById(chapterId);
      if (chapter) {
        chapter.UsersProgress.push(progress._id);
        await chapter.save();
      } else {
        return next(new ErrorHandler("Chapter not found", 404));
      }
    }

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      progress,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const validateCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    // check course exists in user enrollments
    const isEnrolled = user.enrollments.some(
      (enrollment) => enrollment.courseId.toString() === courseId
    );

    if (!isEnrolled) {
      throw new Error("Course not found");
    }

    const course = await Course.findById(courseId);

    const isStudentExists = course.enrollments.some(
      (enrollment) => enrollment.student.toString() === req.user._id.toString()
    );

    if (!isStudentExists) {
      throw new Error("Unauthorized, don't have access");
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllEnrollments = CatchAsyncError(async (req, res, next) => {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const enrollments = await Enrollment.find(query)
      .populate({
        path: "courseId",
        select: "title duration",
      })
      .populate({
        path: "userId",
        select: "firstName lastName email phone",
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalEnrollments = await Enrollment.countDocuments(query);

    res.status(200).json({
      enrollments,
      totalEnrollments,
      totalPages: Math.ceil(totalEnrollments / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    return next(new ErrorHandler(error, error, 400));
  }
});

module.exports = {
  getEnrolledCourseDetails,
  getAllDetails,
  getLessionDetails,
  chapterProgress,
  validateCourse,
  getAllEnrollments,
};
