const { isValidToken } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.status(401).json({ message: "Authentication Failed!" });
  }
  try {
    const { username, email, userId } = isValidToken({ token });
    req.user = { username, email, userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication Failed!" });
  }
};

module.exports = authenticateUser;
