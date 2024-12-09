const express = require("express");
const {
  createModule,
  updateModule,
  deleteModule,
} = require("../../controllers/module-controller");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const moduleRouter = express.Router();

moduleRouter.post(
  "/:courseId/module",
  isAuthenticated,
  authorizRoles("admin"),
  createModule
);
moduleRouter.put(
  "/:courseId/reorder",
  isAuthenticated,
  authorizRoles("admin"),
  moduleRouter
);
moduleRouter.patch(
  "/:courseId/modules/:moduleId/update",
  isAuthenticated,
  authorizRoles("admin"),
  updateModule
);
moduleRouter.delete("/:courseId/modules/:moduleId", deleteModule);

module.exports = moduleRouter;
