import { body, param } from "express-validator";

export const validateRegister = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("email")
    .isEmail().withMessage("Invalid email format")
    .notEmpty().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    .notEmpty().withMessage("Password is required"),
];

export const validateLogin = [
  body("email")
    .isEmail().withMessage("Invalid email format")
    .notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateResetPasswordInit = [
  body("email")
    .isEmail().withMessage("Invalid email format")
    .notEmpty().withMessage("Email is required"),
];

export const validateResetPasswordFinal = [
  param("token").notEmpty().withMessage("Reset token is required"),
  body("newPassword")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    .notEmpty().withMessage("New password is required"),
];

export const validateChangePassword = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 6 }).withMessage("New password must be at least 6 characters long")
    .notEmpty().withMessage("New password is required"),
];
