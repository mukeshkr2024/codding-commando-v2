const express = require("express");
const {
  getByName,
  createOrderPayment,
  handleVerifyOrder,
  registerWorkshop,
  getWorkshopDetails,
} = require("../../controllers/workshop-controller");
const workshopRouter = express.Router();

workshopRouter.post("/register", registerWorkshop);
workshopRouter.get("/get-details", getWorkshopDetails);
workshopRouter.get("/:name", getByName);
workshopRouter.post("/:name/create-order", createOrderPayment);
workshopRouter.post("/:name/verify-order", handleVerifyOrder);

module.exports = workshopRouter;
