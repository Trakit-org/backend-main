import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  resetPasswordInit,
  resetPasswordFinal,
  changePassword
} from "../controllers/authController.js";

import {
  validateRegister,
  validateLogin,
  validateResetPasswordInit,
  validateResetPasswordFinal,
  validateChangePassword,
} from "../middleware/authValidator.js";
import { handleValidationErrors } from "../middleware/validationErrorHandler.js";

const router = express.Router();

// Endpoints prefix: api/v1/auth
// Define routes
router.post("/signup", validateRegister, handleValidationErrors, registerUser);
router.post("/login", validateLogin, handleValidationErrors, loginUser);
router.post("/logout", logoutUser);
router.post(
  "/reset-password", validateResetPasswordInit, handleValidationErrors, resetPasswordInit
);
router.patch(
  "/reset-password/:token", validateResetPasswordFinal, handleValidationErrors, resetPasswordFinal
);
router.patch("/change-password", validateChangePassword, handleValidationErrors, changePassword);

export default router;
