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

import {
  validateCreateSubscription,
  validateSubscriptionId,
  validateSearchSubscriptions,
  validateGetAllSubscriptions,
  validateUpdateSubscription
} from "../middleware/subscriptionValidator.js";

import { handleValidationErrors } from "../middleware/validationErrorHandler.js";

const router = express.Router();

// Endpoints prefix: api/v1/subscriptions
// Define routes
router.route("/")
  .post(validateCreateSubscription, handleValidationErrors, createSubscription)
  .get(validateGetAllSubscriptions, handleValidationErrors, getAllSubscriptions)
  .delete(deleteAllSubscriptions);

router.get("/search", validateSearchSubscriptions, handleValidationErrors, searchSubscriptions);

router.route("/:id")
  .get(validateSubscriptionId, handleValidationErrors, getSubscription)
  .patch(
    validateSubscriptionId, validateUpdateSubscription, handleValidationErrors, updateSubscription
  )
  .delete(validateSubscriptionId, handleValidationErrors, deleteSubscription);

export default router;
