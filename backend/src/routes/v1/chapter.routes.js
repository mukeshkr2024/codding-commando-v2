const express = require("express");
const {
  createChapter,
  getAllChapters,
  getChapterById,
  updateChapter,
  uploadChapterVideo,
  deletChapterById,
  assignMentor,
  unassignMentor,
  sendNotifications,
  sendReminderNotification,
} = require("../../controllers/chapter.controller");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const multer = require("multer");
const keyObjectivesRouter = require("./keyObjectives.routes");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const chapterRouter = express.Router();

chapterRouter.use("/key-objectives", keyObjectivesRouter);

chapterRouter.post(
  "/:courseId/modules/:moduleId/chapters",
  isAuthenticated,
  authorizRoles("admin"),
  createChapter
);
chapterRouter.get(
  "/:courseId/modules/:moduleId",
  isAuthenticated,
  authorizRoles("admin"),
  getAllChapters
);
chapterRouter.get(
  "/:courseId/modules/:moduleId/chapters/:chapterId",
  isAuthenticated,
  authorizRoles("admin"),
  getChapterById
);

chapterRouter.patch(
  "/:courseId/modules/:moduleId/chapters/:chapterId/update",
  updateChapter
);

chapterRouter.delete(
  "/:courseId/modules/:moduleId/chapters/:chapterId",
  deletChapterById
);

chapterRouter.post(
  "/:courseId/modules/:moduleId/chapters/:chapterId/video-upload",
  upload.single("video"),
  isAuthenticated,
  authorizRoles("admin"),
  uploadChapterVideo
);

chapterRouter.post(
  "/:courseId/modules/:moduleId/chapters/:chapterId/assign-mentor",
  assignMentor
);
chapterRouter.post(
  "/:courseId/modules/:moduleId/chapters/:chapterId/unassign-mentor",
  unassignMentor
);
chapterRouter.post(
  "/:courseId/modules/:moduleId/chapters/:chapterId/send-notifications",
  sendNotifications
);
chapterRouter.post(
  "/:courseId/modules/:moduleId/chapters/:chapterId/remainder-notifications",
  sendReminderNotification
);

module.exports = chapterRouter;
