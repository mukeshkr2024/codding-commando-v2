const express = require("express");
const {
  getEnrolledCourseDetails,
  getAllDetails,
  getLessionDetails,
  chapterProgress,
} = require("../../controllers/enrolled-course-controller");
const { isAuthenticated } = require("../../middleware/auth");
const {
  getChapterAllQuizzes,
} = require("../../controllers/chapter.controller");
const { calculateGrade } = require("../../controllers/quiz-controller");
const enrollCourseRouter = express.Router();

enrollCourseRouter.get("/:courseId", getEnrolledCourseDetails);
enrollCourseRouter.get(
  "/:courseId/get-details",
  isAuthenticated,
  getAllDetails
);
enrollCourseRouter.get(
  "/:courseId/modules/:moduleId/lessons/:lessionId",
  isAuthenticated,
  getLessionDetails
);
enrollCourseRouter.post(
  "/:courseId/modules/:moduleId/chapters/:chapterId/progress",
  isAuthenticated,
  chapterProgress
);
enrollCourseRouter.get(
  "/:courseId/modules/:moduleId/chapters/:chapterId/graded-quiz",
  getChapterAllQuizzes
);

enrollCourseRouter.post(
  "/:courseId/modules/:moduleId/chapters/:chapterId/calculate-grade",
  isAuthenticated,
  calculateGrade
);

module.exports = enrollCourseRouter;
