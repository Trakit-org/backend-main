import express from "express";
const router = express.Router(); // Create a new router instance
// Import controllers
import {
  getUser,
  updateUser,
  deleteUser
  } from "../controllers/userControllers.js";

// Endpoints prefix: api/v1/users (DON'T REPEAT THIS PART IN THE ENDPOINTS)
// Define routes
router.route("/me")
  .get(getUser) // Route for fetching a user's profile details
  .put(updateUser) // Route for updating a user's profile details
  .delete(deleteUser); // Route for deleting a user's account and all associated data

export default router; // Export the router
