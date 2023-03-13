const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getSingleUser,
  getAllUsers,
  showMyProfile,
  editUserProfile,
} = require("../controllers/user");

const { authenticateUser } = require("../middlewares/authentication");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/users/:id").patch(authenticateUser, editUserProfile);

router.route("/profile").get(authenticateUser, showMyProfile);
router.route("/users/:email").get(authenticateUser, getSingleUser);
router.route("/users").get(getAllUsers);

module.exports = router;
