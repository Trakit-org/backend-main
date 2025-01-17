import User from "../models/userModel.js";

// TODO: Auth and/or validation for these controllers.
export const getUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to access user data" });
  }

  try {
    const userID = req.user._id;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({
        msg: `A user with the id ${userID} was not found`
      });
    }

    const { fullName, email, enableNotifications, subscriptions } = user;
    return res.status(200).json({
      user: { fullName, email, enableNotifications, subscriptions }
    });
  } catch (error) {
    console.error("error fetching user data:", error);
    return res.status(500).json({ msg: "Failed to fetch user data" });
  }
};

export const updateUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to update user data" });
  }

  try {
    const userID = req.user._id;
    const data = { ...req.body, };
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        msg: `A user with the id ${userID} was not found`,
      });
    }

    return res.status(200).json({ msg: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("error updating user data:", error);
    return res.status(500).json({ msg: "Failed to update user data" });
  }
};

export const deleteUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to delete user data" });
  }

  try {
    const userID = req.user._id;
    const user = await User.findByIdAndDelete(userID);

    if (!user) {
      return res.status(404).json({
        msg: `A user with the id ${userID} was not found`
      });
    }

    return res.status(200).json({ msg: "User data deleted successfully" });
  } catch (error) {
    console.error("error deleting user data:", error);
    return res.status(500).json({ msg: "Failed to delete user data" });
  }
};
