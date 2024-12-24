require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ApiRoutes = require("../routes");
const ErrorMiddleware = require("../middleware/error");
const publicRoutes = require("../routes/v1/public.routes");
const sendMail = require("../../email");
const seedDatabase = require("../scripts/seed");
const app = express();
// const rateLimit = require("express-rate-limit");

// Use Morgan for logging HTTP requests
app.use(morgan("dev"));
// body parser
app.use(express.json());
// cors
app.use(cors());

app.use("/v1", ApiRoutes);
//public routes
app.use("/v1", publicRoutes);

// test route
app.get("/test", (req, res) => {
  res.send("Welcome Back!");
});

console.log("RAZORPAY_API_KEY_SECRET", process.env.RAZORPAY_API_KEY_SECRET);
console.log("RAZORPAY_API_KEY_ID", process.env.RAZORPAY_API_SECRET_KEY);

//error middleware
app.use(ErrorMiddleware);
module.exports = app;
