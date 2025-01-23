import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    req.user = null; // No token
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userID);

    if (!user || user.passwordVersion !== decoded.passwordVersion) {
      req.user = null; // Password changed or no user found
      return next();
    }

    req.user = { _id: user._id }; // Valid token, auth the user
  } catch (error) {
    req.user = null; // Invalid token
    console.error("invalid token error:", error);
  }

  next();
};

export default optionalAuth;
