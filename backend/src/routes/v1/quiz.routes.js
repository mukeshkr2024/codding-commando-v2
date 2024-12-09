const express = require("express");
const {
  createQuizQuestions,
  getQuizQuestionById,
  updateQuizQuestion,
  createQuestionOptions,
  deleteQuestionOptions,
  deleteQuizQuestion,
  updateQuizOption,
} = require("../../controllers/quiz-controller");

const quizRouter = express.Router();

quizRouter.post(
  "/:courseId/modules/:moduleId/lessons/:lessonId",
  createQuizQuestions
);
quizRouter.get(
  "/:courseId/modules/:moduleId/lessons/:lessonId/:questionId",
  getQuizQuestionById
);
quizRouter.patch(
  "/:courseId/modules/:moduleId/lessons/:lessonId/:questionId",
  updateQuizQuestion
);
quizRouter.post(
  "/options/:courseId/modules/:moduleId/lessons/:lessonId/:questionId",
  createQuestionOptions
);
quizRouter.delete(
  "/:courseId/modules/:moduleId/lessons/:lessonId/:questionId",
  deleteQuizQuestion
);
quizRouter.delete(
  "/options/:courseId/modules/:moduleId/lessons/:lessonId/:questionId/:optionId",
  deleteQuestionOptions
);

quizRouter.patch("/:courseId/modules/:moduleId/lessons/:lessonId/:questionId/option", updateQuizOption)


module.exports = quizRouter;
