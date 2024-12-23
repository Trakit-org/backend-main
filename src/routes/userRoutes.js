import express from "express";
const router = express.Router(); // Create a new router instance

// Endpoints prefix: api/v1/users (DON'T REPEAT THIS PART IN THE ENDPOINTS AGAIN)
// Define routes
router.route("/me")
  .get() // Route for fetching a user's profile details
  .put() // Route for updating a user's profile details
  .delete(); // Route for deleting a user's account and all associated data

export default router; // Export the router