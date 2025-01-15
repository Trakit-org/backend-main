import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    hashedPassword: { type: String, required: true },
    passwordVersion: { type: Number, default: 0 },
    enableNotifications: { type: Boolean, default: true },
    resetToken: String,
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
