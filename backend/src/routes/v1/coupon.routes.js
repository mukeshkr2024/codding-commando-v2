const express = require("express");
const couponRouter = express.Router();

couponRouter.post("/validate/courseId");

module.exports = {
  couponRouter,
};
