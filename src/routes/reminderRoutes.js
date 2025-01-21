import express from "express";

import {
  createReminder,
  getAllReminders,
  deleteAllReminders,
  getReminder,
  updateReminder,
  deleteReminder,
  getUpcomingRenewals
} from "../controllers/reminderController.js";

import {
  validateCreateReminder,
  validateReminderId,
  validateGetAllReminders,
  validateUpdateReminder
} from "../middleware/reminderValidator.js";

import { handleValidationErrors } from "../middleware/validationErrorHandler.js";

const router = express.Router(); // Create a new router instance

// Endpoints prefix: api/v1/reminders
// Define routes
router.route("/")
  // Route for adding a new reminder for the user
  .post(validateCreateReminder, handleValidationErrors, createReminder)
  // Route for retrieving all the user's reminders
  .get(validateGetAllReminders, handleValidationErrors, getAllReminders)
  // Route for deleting all the user's reminders
  .delete(deleteAllReminders);

router.route("/:id")
  // Route for retrieving the user's reminder (with reminder ID in URL)
  .get(validateReminderId, handleValidationErrors, getReminder)
  // Route for updating the user's reminder (with reminder ID in URL)
  .patch(validateReminderId, validateUpdateReminder, handleValidationErrors, updateReminder)
  // Route for deleting the user's reminder (with reminder ID in URL)
  .delete(validateReminderId, handleValidationErrors, deleteReminder);

// Route for retrieving all upcoming reminders with time within a week
router.get("/upcoming-renewals", getUpcomingRenewals);

export default router; // Export the router
