const tokenUser = (user) => {
  return {
    username: user.username,
    userId: user._id,
    email: user.email,
    age: user.age,
  };
};

module.exports = tokenUser;
