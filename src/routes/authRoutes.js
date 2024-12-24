import express from "express";
// Import controllers
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPasswordInit,
  resetPasswordFinal
} from "../controllers/authControllers.js";

const router = express.Router(); // Create a new router instance

// Endpoints prefix: api/v1/auth (DON'T REPEAT THIS PART IN THE ENDPOINTS)
// Define routes
router.post("/signup", registerUser); // Route for registration
router.post("/login", loginUser); // Route for login
router.post("/logout", logoutUser); // Route for logout
router.post("/reset-password", resetPasswordInit); // Route for initiating password reset
router.put("/reset-password/:token", resetPasswordFinal); // Route for completing password reset

export default router; // Export the router
