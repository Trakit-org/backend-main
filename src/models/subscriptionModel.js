import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true },
    category: {
      type: String,
      enum: [
        'Entertainment', 
        'Productivity', 
        'News & Magazines', 
        'Fitness & Health', 
        'Education', 
        'Shopping & Deals', 
        'Food & Drink', 
        'Finance',
        'None'
      ],
      default: 'None'
    },
    billingCycle: {
      type: String,
      enum: ['Monthly', 'Quarterly', 'Annually', 'OneTime'],
      default: 'Monthly'
    },
    nextBillingDate: { type: Date, required: true },
    notes: String,
    active: { type: Boolean, default: true},
    reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reminder" }],
  },
  { timestamps: true }
);

// Middleware to Update Active Status
SubscriptionSchema.pre("save", function (next) {
  // Avoid infinite loop when modifying "active" triggers a save. 
  if (!this.isModified("nextBillingDate")) {
    return next();
  }

  const currentDate = new Date();
  this.active = this.nextBillingDate >= currentDate;

  next();
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
