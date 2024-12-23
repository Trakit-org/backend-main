import express from "express";
const router = express.Router(); // Create a new router instance

// Endpoints prefix: api/v1/auth (DON'T REPEAT THIS PART IN THE ENDPOINTS AGAIN)
// Define routes
router.post("/signup"); // Route for registration
router.post("/login"); // Route for login
router.post("/logout"); // Route for logout
router.post("/reset-password"); // Route for initiating password reset
router.put("/reset-password/:token"); // Route for completing password reset

export default router; // Export the router