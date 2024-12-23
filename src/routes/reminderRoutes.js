import express from "express";
const router = express.Router(); // Create a new router instance

// Endpoints prefix: api/v1/reminders (DON'T REPEAT THIS PART IN THE ENDPOINTS AGAIN)
// Define routes
router.post("/"); // Route for adding a new reminder for the user
router.get("/:id"); // Route for retrieving the user's reminder (with reminder ID in URL)
router.get("/"); // // Route for retrieving all the user's reminders
router.put("/:id"); // Route for updating the user's reminder (with reminder ID in URL)
router.delete("/:id"); // Route for deleting the user's reminder (with reminder ID in URL)
router.delete("/"); // Route for deleting all the user's reminders

export default router; // Export the router