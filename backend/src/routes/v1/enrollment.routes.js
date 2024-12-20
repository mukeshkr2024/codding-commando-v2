const express = require("express");
const {
  getAllEnrollments,
} = require("../../controllers/enrolled-course-controller");

const enrollmentRouter = express.Router();

enrollmentRouter.get("/", getAllEnrollments);

module.exports = {
  enrollmentRouter,
};
