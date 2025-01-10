import express from "express";
const router = express.Router(); // Create a new router instance

import {
  getUser,
  updateUser,
  deleteUser
  } from "../controllers/userController.js";

// Endpoints prefix: api/v1/users
// Define routes
router.route("/me")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
