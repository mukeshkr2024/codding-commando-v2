const express = require("express");
const {
  getCourseDetails,
  handleCompleteOrder,
  handleCreateOrder,
  handleVerifyOrder,
} = require("../../controllers/purchase.controller");
const purchaseRouter = express.Router();

purchaseRouter.get("/course/:id", getCourseDetails);
purchaseRouter.post("/order-request", handleCompleteOrder);
purchaseRouter.post("/create-order/:courseId", handleCreateOrder);
purchaseRouter.post("/:courseId/verify", handleVerifyOrder);

module.exports = purchaseRouter;
