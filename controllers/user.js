const { User } = require("../models");

exports.registerUser = async (req, res) => {
  const { username, email, password, age } = req.body;
  try {
    const user = await User.create({ username, email, password, age });
    return res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please enter Email and Password");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User Does Not Exist");
  }
  const passwordIsCorrect = await user.comparePassword(password);
  if (!passwordIsCorrect) {
    console.log(password);
    console.log(email);
    throw new Error("Incorrect Password or Email");
  }
  return res.status(200).json(user);
};
