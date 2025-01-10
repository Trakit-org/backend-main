import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    hashedPassword: { type: String, required: true },
    enableNotifications: { type: Boolean, default: true },
    sessionID: String,
    resetToken: String,
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
