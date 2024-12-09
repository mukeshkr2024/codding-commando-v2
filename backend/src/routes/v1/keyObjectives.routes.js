const express = require("express");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  addKeyObjectives,
  getByKeyObjectivesId,
  deletekeyObjectives,
} = require("../../controllers/keyObjectives.controller");
const keyObjectivesRouter = express.Router();

keyObjectivesRouter.post(
  "/:courseId/modules/:moduleId/chapters/:chapterId",
  isAuthenticated,
  authorizRoles("admin"),
  addKeyObjectives
);

keyObjectivesRouter.get(
  "/:chapterId",
  isAuthenticated,
  authorizRoles("admin"),
  getByKeyObjectivesId
);

keyObjectivesRouter.delete(
  "/:courseId/modules/:moduleId/chapters/:chapterId/:objectiveId",
  isAuthenticated,
  authorizRoles("admin"),
  deletekeyObjectives
);

module.exports = keyObjectivesRouter;
