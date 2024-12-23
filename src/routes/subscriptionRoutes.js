import express from "express";
const router = express.Router(); // Create a new router instance

// Endpoints prefix: api/v1/subscriptions (DON'T REPEAT THIS PART IN THE ENDPOINTS AGAIN)
// Define routes
router.post("/"); // Route for adding a new subscription for the user or guest
router.get("/:id"); // Route for retrieving the user's subscription (with sub ID in URL) details
router.get("/"); // Route for retrieving all the user's subscription details
router.get("/search"); // Route for searching subscriptions for the user/guest using filter criteria
router.put("/:id"); // Route for updating the user's subscription (with sub ID in URL) details
router.delete("/:id"); // Route for deleting the user's subscription (with sub ID in URL) details
router.delete("/"); // Route for deleting all the user's subscriptions and their details

export default router; // Export the router