const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  findSingleUser,
  getAllUsers,
} = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/:email", findSingleUser);
router.get("/users", getAllUsers);

module.exports = router;
