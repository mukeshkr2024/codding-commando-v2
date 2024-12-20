const express = require("express");
const userRouter = require("./v1/user.routes");
const contactRouter = require("./v1/contact-to.routes");
const courseRouter = require("./v1/course.routes");
const mentorRouter = require("./v1/mentor.routes");
const multer = require("multer");

const {
  getEnrolledCourses,
  getCoursesBanner,
  getCourseLinks,
} = require("../controllers/course.controller");
const {
  isAuthenticated,
  authorizRoles,
  validateSession,
} = require("../middleware/auth");
const analyticsRouter = require("./v1/analytics.routes");
const {
  getAllMentorsByUser,
  getTeamMembers,
  getAllMembers,
} = require("../controllers/mentor-controller");
const { getAllPuchase } = require("../controllers/payment.controller");
const uploadImage = require("../controllers/file.upload-controller");
const UploadImageApi = require("../controllers/upload-image-controller");
const purchaseRouter = require("./v1/purchase.routes");
const workshopRouter = require("./v1/workshop.routes");
const enrollCourseRouter = require("./v1/enrolled-course.routes");
const quizRouter = require("./v1/quiz.routes");
const { enrollmentRouter } = require("./v1/enrollment.routes");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// upload
// router.post("/upload", uploadImage);
// upload
router.post("/upload", upload.single("image"), UploadImageApi);
// upload video
// delete video
// user routes
router.use("/users", userRouter);
// courses routes
router.use("/courses", courseRouter);
// enrollments
router.use("/enrollments", enrollmentRouter);
// enrolled courses activities
router.use("/enrolled/course", enrollCourseRouter);
// course Links
router.get("/links-courses", getCourseLinks);
// enrolled courses
router.get("/enrolled-courses", isAuthenticated, getEnrolledCourses);
// without enrolled courses
router.get("/without-enrolled-courses", isAuthenticated);

// contact router
router.use("/send", contactRouter);
router.use("/mentors", mentorRouter);
router.use("/", analyticsRouter);
router.get("/teachers", getAllMentorsByUser);
router.get("/banners", getCoursesBanner);
router.get(
  "/purchases",
  isAuthenticated,
  authorizRoles("admin"),
  getAllPuchase
);
router.get("/validate-session", validateSession);
router.get("/members", getTeamMembers);
router.get(
  "/teams",
  // authorizRoles("admin"), // TODO
  getAllMembers
);
// workshop
router.use("/workshop", workshopRouter);

// purchase routes
router.use("/payment", purchaseRouter);

// quiz routes
router.use("/quiz-questions", quizRouter);

module.exports = router;
