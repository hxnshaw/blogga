const tokenUser = (user) => {
  return {
    username: user.username,
    userId: user.id,
    email: user.email,
    age: user.age,
    role: user.role,
  };
};

module.exports = tokenUser;
