const CatchAsyncError = require("../middleware/catchAsyncError");
const KeyObjectives = require("../models/keyObjectives.model");
const ErrorHandler = require("../utils/ErrorHandler");
const Module = require("../models/module.model");
const Chapter = require("../models/chapter.model");
const Course = require("../models/course.model");

const addKeyObjectives = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;
    const moduleId = req.params.moduleId;
    console.log(req.params);
    // console.log(courseId,"courseId");
    // console.log(chapterId,"chapterId");

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const module = await Module.findById(moduleId);
    if (!module) {
      return next(new ErrorHandler("Module not found", 404));
    }

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return next(new ErrorHandler("Chapter not found", 404));
    }

    const objectives = await KeyObjectives.create({
      chapterId: chapterId,
      description: req.body.description,
    });

    chapter.keyObjectives.push(objectives._id);
    await chapter.save();

    res.status(201).json({
      success: true,
      message: "objectives created successfully",
      chapter,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getByKeyObjectivesId = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;
    const chapterId = req.params.chapterId;

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const module = await Module.findById(moduleId);
    if (!module) {
      return next(new ErrorHandler("Module not found", 404));
    }

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return next(new ErrorHandler("Chapter not found", 404));
    }

    const objectives = await KeyObjectives.find({
      chapterId: chapterId,
      description: req.body.description,
    });

    return res.status(200).json({
      status: true,
      message: "Fetched sucessfully",
      mentor,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const deletekeyObjectives = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;
    const chapterId = req.params.chapterId;
    const objectiveId = req.params.objectiveId;

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return next(new ErrorHandler("Chapter not found", 404));
    }

    const keyObjectives = await KeyObjectives.findByIdAndDelete(objectiveId);
    if (!keyObjectives) {
      return next(new ErrorHandler("keyObjectives not found", 404));
    }

    chapter.keyObjectives.pull(objectiveId);
    await chapter.save();

    res.status(200).json({
      success: true,
      message: "keyObjectives deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  addKeyObjectives,
  getByKeyObjectivesId,
  deletekeyObjectives,
};
