import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  if (!token) {
    req.user = null; // No token, treat as a guest or return error in controllers

    return next();
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Valid token, auth the user
  } catch (error) {
    req.user = null; // Invalid token, treat as a guest or return error in controllers
    console.error("invalid token error:", error);
  }

  next();
};

export default optionalAuth;
