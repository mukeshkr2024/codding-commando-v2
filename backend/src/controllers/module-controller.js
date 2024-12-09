const CatchAsyncError = require("../middleware/catchAsyncError");
const Chapter = require("../models/chapter.model");
const Course = require("../models/course.model");
const Module = require("../models/module.model");
const ErrorHandler = require("../utils/ErrorHandler");

const createModule = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    // Fetching the last module to determine the new position
    const lastModule = await Module.find({ course: courseId })
      .sort({
        position: -1,
      })
      .limit(1);

    const newPosition = lastModule.length > 0 ? lastModule[0].position + 1 : 1;

    const module = await Module.create({
      course: courseId,
      title: req.body.title,
      position: newPosition,
    });

    course.modules.push(module._id);
    await course.save();

    res.status(201).json({
      success: true,
      message: "Module created successfully",
      module,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const moduleReorder = CatchAsyncError(async (req, res, next) => {
  try {
    const { list } = req.body;
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateModule = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;

    const course = await Course.findById(courseId);
    if (!course) {
      throw next(new ErrorHandler("Course Not found", 404));
    }

    const module = await Module.findOneAndUpdate(
      {
        _id: moduleId,
        course: courseId,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!module) {
      throw next(new ErrorHandler("Module not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Module updated successfully",
      module,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const deleteModule = CatchAsyncError(async (req, res, next) => {
  const { courseId, moduleId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const module = await Module.findById(moduleId);
  if (!module) {
    return next(new ErrorHandler("Module not found", 404));
  }

  await Chapter.deleteMany({
    course: courseId,
    module: moduleId,
  });

  await Module.findByIdAndDelete(moduleId);

  res.status(200).json({
    success: true,
    message: "Module deleted successfully",
  });
});

module.exports = {
  createModule,
  moduleReorder,
  updateModule,
  deleteModule,
};
