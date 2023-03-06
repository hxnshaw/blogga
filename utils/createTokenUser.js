const tokenUser = (user) => {
  return {
    username: user.username,
    userId: user._id,
    email: user.email,
    age: user.age,
    role: user.role,
  };
};

module.exports = tokenUser;
