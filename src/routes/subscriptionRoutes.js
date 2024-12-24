import express from "express";

import {
  createSubscription,
  getAllSubscriptions,
  deleteAllSubscriptions,
  getSubscription,
  updateSubscription,
  deleteSubscription,
  searchSubscriptions,
} from "../controllers/subscriptionController.js";

const router = express.Router();

// Endpoints prefix: api/v1/subscriptions
// Define routes
router
  .route("/")
  .post(createSubscription)
  .get(getAllSubscriptions)
  .delete(deleteAllSubscriptions);

router.get("/search", searchSubscriptions);

router
  .route("/:id")
  .get(getSubscription)
  .patch(updateSubscription)
  .delete(deleteSubscription);

export default router;
