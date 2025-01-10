import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

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
    if (!user) {
      return res.status(404).json({ msg: "No user found for the provided email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

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
    return res.status(401).json({ msg: "You must be logged in to log out" });
  }

  try {
    // The client will handle removing the token from storage
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error("error logging out user:", error);
    return res.status(500).json({ msg: "Failed to log user out" });
  }
};

export const resetPasswordInit = (req, res) => {
  // TODO: Implement real business logic. 
  res.send("Reset password, initial step");
};

export const resetPasswordFinal = (req, res) => {
  // TODO: Implement real business logic. 
  res.send("Reset password, final step");
};
