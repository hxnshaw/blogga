const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getSingleUser,
  getAllUsers,
  showMyProfile,
  editUserProfile,
  updateUserPassword,
  deleteUser,
} = require("../controllers/user");

const { authenticateUser } = require("../middlewares/authentication");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router
  .route("/users/:id")
  .patch(authenticateUser, editUserProfile)
  .delete(authenticateUser, deleteUser);

router.route("/profile").get(authenticateUser, showMyProfile);

router
  .route("/profile/updatePassword")
  .patch(authenticateUser, updateUserPassword);

router.route("/users/:email").get(authenticateUser, getSingleUser);
router.route("/users").get(getAllUsers);

module.exports = router;
