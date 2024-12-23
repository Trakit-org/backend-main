import express from "express";
const router = express.Router(); // Create a new router instance

// Endpoints prefix: api/v1/reminders (DON'T REPEAT THIS PART IN THE ENDPOINTS AGAIN)
// Define routes
router.route("/")
  .post() // Route for adding a new reminder for the user
  .get() // // Route for retrieving all the user's reminders
  .delete(); // Route for deleting all the user's reminders

router.route("/:id")
  .get() // Route for retrieving the user's reminder (with reminder ID in URL)
  .put() // Route for updating the user's reminder (with reminder ID in URL)
  .delete(); // Route for deleting the user's reminder (with reminder ID in URL)

export default router; // Export the router