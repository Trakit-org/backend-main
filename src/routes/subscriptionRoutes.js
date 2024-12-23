import express from "express";
const router = express.Router(); // Create a new router instance

// Endpoints prefix: api/v1/subscriptions (DON'T REPEAT THIS PART IN THE ENDPOINTS AGAIN)
// Define routes
router.route("/")
  .post() // Route for adding a new subscription for the user or guest
  .get() // Route for retrieving all the user's subscription details
  .delete(); // Route for deleting all the user's subscriptions and their details

router.route("/:id")
  .get() // Route for retrieving the user's subscription (with sub ID in URL) details
  .put() // Route for updating the user's subscription (with sub ID in URL) details
  .delete(); // Route for deleting the user's subscription (with sub ID in URL) details

router.get("/search"); // Route for searching subscriptions for the user/guest using filter criteria

export default router; // Export the router