const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  findSingleUser,
} = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:email", findSingleUser);

module.exports = router;
