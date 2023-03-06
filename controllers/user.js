const { User } = require("../models");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

exports.registerUser = async (req, res) => {
  const { username, email, password, age } = req.body;
  try {
    const emailAlreadyExists = await User.findOne({
      where: { email: email },
    });

    if (emailAlreadyExists) {
      return res
        .status(400)
        .json({ message: "This Email is registered to a user" });
    }
    //Assign the admin role to the first account
    const firstAccountIsAdmin =
      (await User.findAndCountAll({
        where: { email: email },
      })) === 0;
    const role = firstAccountIsAdmin ? "admin" : "user";
    const user = await User.create({ username, email, password, age, role });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    return res.status(201).json({ user: tokenUser });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Please enter Email and Password");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User Does Not Exist");
    }
    const passwordIsCorrect = await user.comparePassword(password);
    if (!passwordIsCorrect) {
      throw new Error("Incorrect Password or Email");
    }
    return res
      .status(200)
      .json({ message: "Logged in successfully", data: user });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Find a user with the email address cos it is unique
exports.findSingleUser = async (req, res) => {
  const { email: userEmail } = req.params;
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new Error("User not found");
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    return res.status(200).json({ users: users.length, data: users });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
