import { body } from "express-validator";

export const validateUpdateUser = [
  body("fullName")
    .optional()
    .isString()
    .withMessage("Full name must be a string"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be valid"),
  body("enableNotifications")
    .optional()
    .isBoolean()
    .withMessage("Enable Notifications must be a boolean"),
];
