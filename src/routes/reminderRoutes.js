import express from "express";
// Import controllers
import {
  createReminder,
  getAllReminders,
  deleteAllReminders,
  getReminder,
  updateReminder,
  deleteReminder
} from "../controllers/reminderController.js";

const router = express.Router(); // Create a new router instance

// TODO: Auth and/or validation for these controllers.

// Endpoints prefix: api/v1/reminders
// Define routes
router.route("/")
  .post(createReminder) // Route for adding a new reminder for the user
  .get(getAllReminders) // // Route for retrieving all the user's reminders
  .delete(deleteAllReminders); // Route for deleting all the user's reminders

router.route("/:id")
  .get(getReminder) // Route for retrieving the user's reminder (with reminder ID in URL)
  .put(updateReminder) // Route for updating the user's reminder (with reminder ID in URL)
  .delete(deleteReminder); // Route for deleting the user's reminder (with reminder ID in URL)

export default router; // Export the router
