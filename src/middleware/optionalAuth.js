import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const optionalAuth = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
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
