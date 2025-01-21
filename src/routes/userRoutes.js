import express from "express";
const router = express.Router(); // Create a new router instance

import {
  getUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import { validateUpdateUser } from "../middleware/userValidator.js";
import { handleValidationErrors } from "../middleware/validationErrorHandler.js";

// Endpoints prefix: api/v1/users
// Define routes
router.route("/me")
  .get(getUser)
  .patch(validateUpdateUser, handleValidationErrors, updateUser)
  .delete(deleteUser);

export default router;
