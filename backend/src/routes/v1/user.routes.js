const express = require("express");
const {
  registerUser,
  activateUser,
  loginUser,
  getAllStudents,
  getUserById,
  getUserByToken,
  blockUser,
  unblockUser,
  getUserInfoController,
  updateProfileController,
  deleteUser,
  resetPassword,
  changePassword,
  updateProfile,
  verifyPassword,
  deleteProfilePic,
  getUserPurchaseDetails,
} = require("../../controllers/user-controller");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  validateCourse,
} = require("../../controllers/enrolled-course-controller");
const userRouter = express.Router();

//registration user
userRouter.post("/register", registerUser);
//activate user
userRouter.post("/activate", activateUser);
// login user
userRouter.post("/login", loginUser);
// reset password
userRouter.post("/reset-password", resetPassword);
// change password
userRouter.post("/change-password", changePassword);

//POST SINGLE DOC INFO
userRouter.get("/getUserInfo", isAuthenticated, getUserInfoController);

//POST UPDATE PROFILE
userRouter.patch("/updateProfile", isAuthenticated, updateProfileController);

userRouter.delete("/profile-pic", isAuthenticated, deleteProfilePic);

// verifyPassword
userRouter.post("/verfiy-password", isAuthenticated, verifyPassword);

// invoices
userRouter.get("/invoices", isAuthenticated, getUserPurchaseDetails);

//delete user
userRouter.delete("/:userId/delete", isAuthenticated, deleteUser);
userRouter.get(
  "/course/:courseId/validate-course",
  isAuthenticated,
  validateCourse
);

// get all students
userRouter.get(
  "/students",
  isAuthenticated,
  authorizRoles("admin"),
  getAllStudents
);

userRouter.get(
  "/students/:studentId",
  isAuthenticated,
  authorizRoles("admin"),
  getUserById
);
userRouter.patch(
  "/students/:studentId/block",
  isAuthenticated,
  authorizRoles("admin"),
  blockUser
);
userRouter.patch(
  "/students/:studentId/unblock",
  isAuthenticated,
  authorizRoles("admin"),
  unblockUser
);
userRouter.get("/session", isAuthenticated, getUserByToken);
userRouter.patch("/profile-update", isAuthenticated, updateProfile);

module.exports = userRouter;
