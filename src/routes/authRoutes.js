import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  resetPasswordInit,
  resetPasswordFinal
} from "../controllers/authController.js";

const router = express.Router();

// TODO: Auth and/or validation for these controllers.

// Endpoints prefix: api/v1/auth
// Define routes
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/reset-password", resetPasswordInit);
router.patch("/reset-password/:token", resetPasswordFinal);

export default router;
