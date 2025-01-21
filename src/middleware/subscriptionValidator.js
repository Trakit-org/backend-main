import { body, param, query } from "express-validator";

export const validateCreateSubscription = [
  body("service")
    .notEmpty()
    .withMessage("Service is required")
    .isString()
    .withMessage("Service must be a string"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isInt()
    .withMessage("Price must be a positive integer"),
  body("category")
    .optional()
    .isIn([
      "Entertainment", "Productivity", "News & Magazines", "Fitness & Health",
      "Education", "Shopping & Deals", "Food & Drink", "Finance"
    ])
    .withMessage("Category must be one of the outlined categories"),
  body("billingCycle")
    .optional()
    .isIn(["Monthly", "Annually", "Weekly", "Quarterly", "One-time"])
    .withMessage("Billing cycle must be one of the outlined cycles"),
  body("nextBillingDate")
    .notEmpty()
    .withMessage("Next billing date is required"),
  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string"),
];

export const validateSubscriptionId = [
  param("id")
    .notEmpty()
    .withMessage("Subscription ID is required"),
];

export const validateSearchSubscriptions = [
  query("service")
    .optional()
    .isString()
    .withMessage("Service must be a string"),
  query("category")
    .optional()
    .isIn([
      "Entertainment", "Productivity", "News & Magazines", "Fitness & Health",
      "Education", "Shopping & Deals", "Food & Drink", "Finance"
    ])
    .withMessage("Category must be one of the outlined categories"),
  query("billingCycle")
    .optional()
    .isIn(["Monthly", "Annually", "Weekly", "Quarterly", "One-time"])
    .withMessage("Billing cycle must be one of the outlined cycles"),
  query("active")
    .optional()
    .isBoolean()
    .withMessage("Active must be a boolean"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];

export const validateGetAllSubscriptions = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];

export const validateUpdateSubscription = [
  body("service")
    .optional()
    .isString()
    .withMessage("Service must be a string"),
  body("price")
    .optional()
    .isInt()
    .withMessage("Price must be a positive integer"),
  body("category")
    .optional()
    .isIn([
      "Entertainment", "Productivity", "News & Magazines", "Fitness & Health",
      "Education", "Shopping & Deals", "Food & Drink", "Finance"
    ])
    .withMessage("Category must be one of the outlined categories"),
  body("billingCycle")
    .optional()
    .isIn(["Monthly", "Annually", "Weekly", "Quarterly", "One-time"])
    .withMessage("Billing cycle must be one of the outlined cycles"),
  body("nextBillingDate")
    .optional(),
  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string"), 
];
