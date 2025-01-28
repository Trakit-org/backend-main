import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const optionalAuth = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;
  if (!token) {
    req.user = null; // No token found
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      req.user = null; // No user found
      return next();
    }

    req.user = decoded; // Valid token, auth the user
  } catch (error) {
    req.user = null; // Invalid token
    console.error("invalid token error:", error);
  }

  next();
};

export default optionalAuth;
