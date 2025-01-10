import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema(
  {
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", required: true },
    reminderTime: { type: Date, required: true },
    message: { type: String, trim: true },
    // TODO: Implement a utility that sends the reminder and updates sent and sentTime values
    sent: { type: Boolean, default: false },
    sentTime: { type: Date },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Middleware to Update Active Status
ReminderSchema.pre("save", function (next) {
  if (!this.isModified("sent") && !this.isModified("reminderTime")) {
    return next();
  }

  const currentTime = new Date();
  this.active = !(this.sent || this.reminderTime < currentTime);

  next();
});

const Reminder = mongoose.model("Reminder", ReminderSchema);

export default Reminder;
