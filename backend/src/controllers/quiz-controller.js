const CatchAsyncError = require("../middleware/catchAsyncError");
const Chapter = require("../models/chapter.model");
const { QuizQuestion, Option } = require("../models/quiz-questions-models");
const UserProgress = require("../models/user-progress.model");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");

const createQuizQuestions = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId, moduleId, lessonId } = req.params;

    const { title } = req.body;

    const lesson = await Chapter.findById(lessonId);

    const quizQuestion = await QuizQuestion.create({
      title: title,
      chapterId: lessonId,
    });

    if (!lessonId) {
      throw new Error("Unable to create quizQuestion");
    }

    lesson.quiz_questions.push(quizQuestion._id);

    await lesson.save();

    return res.status(200).json({
      success: true,
      message: "QuizQuestion has been created",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getQuizQuestionById = CatchAsyncError(async (req, res, next) => {
  try {
    const { lessonId, questionId } = req.params;

    const lesson = await Chapter.findById(lessonId);
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    const question = await QuizQuestion.findOne({
      _id: questionId,
      chapterId: lessonId,
    }).populate({ path: "options", select: "text isCorrect" });

    if (!question) {
      throw new Error("Question not found");
    }

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateQuizQuestion = CatchAsyncError(async (req, res, next) => {
  const { lessonId, questionId } = req.params;

  try {
    const lesson = await Chapter.findById(lessonId);
    if (!lesson) {
      throw new ErrorHandler("Lesson not found", 404);
    }

    const question = await QuizQuestion.findOneAndUpdate(
      {
        _id: questionId,
        chapterId: lessonId,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!question) {
      throw new ErrorHandler("Question not found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Question updated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteQuizQuestion = CatchAsyncError(async (req, res, next) => {
  try {
    const { lessonId, questionId } = req.params;

    // Find the lesson by ID
    const lesson = await Chapter.findById(lessonId);
    if (!lesson) {
      return next(new ErrorHandler("Lesson not found", 404));
    }

    // Find and delete the question
    const question = await QuizQuestion.findOneAndDelete({
      _id: questionId,
      chapterId: lessonId,
    });

    if (!question) {
      return next(new ErrorHandler("Question not found", 404));
    }

    // Remove the question ID from the lesson's quiz_questions array
    lesson.quiz_questions.pull(question._id);
    await lesson.save();

    // Delete all options related to the question
    await Option.deleteMany({
      questionId: question._id,
    });

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const createQuestionOptions = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId, questionId } = req.params;

    const question = await QuizQuestion.findById(questionId);

    if (!question) {
      throw new ErrorHandler("Question not found", 404);
    }

    const options = await Option.create({
      text: req.body.text,
      questionId: questionId,
      isCorrect: true,
    });

    if (!options) {
      throw new ErrorHandler("Unable to create options", 500);
    }

    question.options.push(options._id);
    await question.save();

    return res.status(200).json({
      success: true,
      message: "Options created successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteQuestionOptions = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId, questionId, optionId } = req.params;

    const question = await QuizQuestion.findById(questionId);

    if (!question) {
      throw new ErrorHandler("Question not found", 404);
    }

    const option = await Option.findById(optionId);

    if (!option) {
      throw new ErrorHandler("Option not found", 404);
    }

    // Remove the option from the question's options array
    question.options.pull(optionId);
    await question.save();

    // Delete the option
    await Option.findByIdAndDelete(optionId);

    return res.status(200).json({
      success: true,
      message: "Option deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateQuizOption = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId, questionId, moduleId } = req.params;
    const optionId = req.body?.optionId;

    const question = await QuizQuestion.findById(questionId).populate(
      "options"
    );

    if (!question) {
      return next(new ErrorHandler("Question not found", 404));
    }

    // Loop through the options of the question
    for (const option of question.options) {
      // Set isCorrect to false for all options except the one with optionId
      if (option._id.toString() === optionId) {
        option.isCorrect = true;
      } else {
        option.isCorrect = false;
      }
      // Save the updated option
      await option.save();
    }

    // Save the question to persist the changes
    await question.save();

    // Send a response if needed
    res.status(200).json({ message: "Quiz option updated successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const calculateGrade = CatchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;
    const user = req?.user;

    const { courseId, chapterId, moduleId } = req.params;

    const lesson = await Chapter.findOne({
      course: courseId,
      module: moduleId,
      _id: chapterId,
    })
      .populate({
        path: "quiz_questions",
        select: "options",
        populate: {
          path: "options",
          select: "isCorrect",
        },
      })
      .select("quiz_questions");

    if (!lesson) {
      throw new Error("Chapter not found");
    }

    let totalCorrect = 0;

    for (const item of data) {
      const { questionId, selectedOptionId } = item;

      const question = lesson.quiz_questions.find(
        (q) => q._id.toString() === questionId
      );

      if (question) {
        const option = question.options.find(
          (opt) => opt._id.toString() === selectedOptionId
        );

        if (option && option.isCorrect) {
          totalCorrect += 1;
        }
      }
    }

    const totalQuestions = lesson.quiz_questions.length;
    const grade = (totalCorrect / totalQuestions) * 100;

    let progress = await UserProgress.findOne({
      chapterId: chapterId,
      userId: user?._id,
    });

    if (progress) {
      progress.is_quiz_completed = true;
      progress.quiz_score = totalCorrect;
      await progress.save();
    } else {
      progress = await UserProgress.create({
        userId: user?._id,
        chapterId: chapterId,
        is_quiz_completed: true,
        quiz_score: totalCorrect,
      });
    }

    return res.status(200).json({ totalCorrect, totalQuestions, grade });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createQuizQuestions,
  getQuizQuestionById,
  updateQuizQuestion,
  createQuestionOptions,
  deleteQuestionOptions,
  deleteQuizQuestion,
  updateQuizOption,
  calculateGrade,
};
