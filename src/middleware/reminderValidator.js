import { body, param, query } from "express-validator";

export const validateCreateReminder = [
  body("reminderTime")
    .notEmpty()
    .withMessage("Reminder time is required"),
  body("message")
    .optional()
    .isString()
    .withMessage("Mesage must be a string"),
];

export const validateReminderId = [
  param("id")
    .notEmpty()
    .withMessage("Reminder ID is required")
    .isMongoId()
    .withMessage("Invalid reminder ID format"),
];

export const validateGetAllReminders = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
];

export const validateUpdateReminder = [
  body("reminderTime")
    .optional(),
  body("message")
    .optional()
    .isString()
    .withMessage("Mesage must be a string"), 
];
