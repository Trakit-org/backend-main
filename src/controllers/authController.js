import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { sendPasswordResetEmail } from "../utils/mailSender.js";

// TODO: Auth and/or validation for these controllers.
export const registerUser = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = { ...otherData, hashedPassword: hashedPassword };
    const user = await User.create(data);
    const { _id, fullName, email, enableNotifications } = user;

    return res.status(201).json({
      msg: "User created successfully", user: { _id, fullName, email, enableNotifications }
    });
  } catch (error) {
    console.error("error registering user:", error);

    if (error.code === 11000) { // Handle mongoose duplicate user error
      return res.status(400).json({ msg: "User already exists" });
    }
    if (error.name === "ValidationError") { // Handle mongoose validation errors
      return res.status(400).json({ msg: error.message });
    }

    return res.status(500).json({ msg: "Failed to create user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      { 
        userID: user._id,
        version: user.passwordVersion || 0 // Add version to invalidate token if password changes
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { _id, fullName, enableNotifications } = user;
    return res.status(200).json({
      msg: "Logged in successfully", user: { _id, fullName, email, enableNotifications }, token
    });
  } catch (error) {
    console.error("error logging in user:", error);
    res.status(500).json({ msg: "Failed to log user in" });
  }
};

export const logoutUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Not logged in" });
  }

  // The client will handle removing the token from storage
  return res.status(200).json({ msg: "Logged out successfully" });
};

export const resetPasswordInit = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ 
        msg: "If an account exists with that email, a password reset link will be sent"
      });
    }

    const resetToken = jwt.sign(
      { 
        userID: user._id,
        version: user.passwordVersion || 0 // Add version to invalidate token if password changes
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    user.resetToken = resetToken;
    await user.save();

    // Send reset link to user's email
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(email, resetLink);

    return res.status(200).json({ 
      msg: "If an account exists with that email, a password reset link will be sent" 
    });
  } catch (error) {
    console.error("error initiating password reset:", error);
    return res.status(500).json({ msg: "Failed to initiate password reset" });
  }
};

export const resetPasswordFinal = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userID);
    if (!user) {
      return res.status(404).json({ msg: "Invalid or expired reset link" });
    }

    if (user.resetToken !== token || user.passwordVersion !== decoded.passwordVersion) {
      return res.status(400).json({ msg: "Invalid or expired reset link" });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.hashedPassword = newHashedPassword;
    user.resetToken = null; // Clear the reset token
    user.passwordVersion = (user.passwordVersion || 0) + 1; // Increment version on password change
    await user.save();

    res.status(200).json({ msg: "Password reset successfully" });
  } catch (error) {
    console.error("error resetting password:", error);
    res.status(500).json({ msg: "Failed to reset password" });
  }
};

export const changePassword = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to change your password" });
  }

  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.hashedPassword = newHashedPassword;
    user.passwordVersion = (user.passwordVersion || 0) + 1; // Increment to invalidate old tokens
    await user.save();

    res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    console.error("error changing password:", error);
    res.status(500).json({ msg: "Failed to change password" });
  }
};
