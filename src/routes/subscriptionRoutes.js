import express from "express";
// Import controllers
import {
  createSubscription,
  getAllSubscriptions,
  deleteAllSubscriptions,
  getSubscription,
  updateSubscription,
  deleteSubscription,
  searchSubscriptions
  } from "../controllers/subscriptionControllers.js";

const router = express.Router(); // Create a new router instance

// Endpoints prefix: api/v1/subscriptions (DON'T REPEAT THIS PART IN THE ENDPOINTS)
// Define routes
router.route("/")
  .post(createSubscription) // Route for adding a new subscription for the user or guest
  .get(getAllSubscriptions) // Route for retrieving all the user's subscription details
  // Route for deleting all the user's subscriptions and their details
  .delete(deleteAllSubscriptions);

// Route for searching subscriptions for the user/guest using filter criteria
router.get("/search", searchSubscriptions);

router.route("/:id")
  // Route for retrieving the user's subscription (with sub ID in URL) details
  .get(getSubscription)
  // Route for updating the user's subscription (with sub ID in URL) details
  .put(updateSubscription)
  // Route for deleting the user's subscription (with sub ID in URL) details
  .delete(deleteSubscription);

export default router; // Export the router
