// TODO: Auth, validation and pagination (not all) for these controllers.
import Subscription from "../models/subscriptionModel.js";

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({});
    if (subscriptions.length === 0) {
      return res
        .status(404)
        .json({ msg: "You have no subscriptions" });
    }
    return res
      .status(200)
      .json({ nbHits: subscriptions.length, subscriptions });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return res.status(500).json({ msg: "Failed to fetch subscriptions" });
  }
};

export const getSubscription = async (req, res) => {
  try {
    const { id: subscriptionID } = req.params;
    const subscription = await Subscription.findById(subscriptionID);

    if (!subscription) {
      return res.status(404).json({
        msg: `A subscription with the id of ${subscriptionID} was not found`,
      });
    }
    return res.status(200).json({ subscription });
  } catch (error) {
    console.error("error fetching subscription:", error);
    return res.status(500).json("Failed to fetch subscription");
  }
};

export const createSubscription = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const subscription = await Subscription.create(data);

    return res
      .status(201)
      .json({ msg: "Subscription created successfully", subscription });
  } catch (error) {
    console.error("error creating subsription:", error);
    return res.status(500).json({ msg: "Failed to create subscription" });
  }
};

export const updateSubscription = async (req, res) => {
  try {
    const { id: subscriptionID } = req.params;

    const data = {
      ...req.body,
    };
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionID,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedSubscription) {
      return res.status(404).json({
        msg: `A subscription with the id of ${subscriptionID} was not found`,
      });
    }

    return res
      .status(200)
      .json({ msg: "Subscription updated successfully", updatedSubscription });
  } catch (error) {
    console.error("error updating subsription:", error);
    return res.status(500).json({ msg: "Failed to update subscription" });
  }
};

export const deleteSubscription = async (req, res) => {
  try {
    const { id: subscriptionID } = req.params;
    const subscription = await Subscription.findByIdAndDelete(subscriptionID);

    if (!subscription) {
      return res.status(404).json({
        msg: `A subscription with the id of ${subscriptionID} was not found`
      });
    }
    return res.status(200).json({ msg: "Subscription deleted successfully", subscription });
  } catch (error) {
    console.error("error deleting subscription:", error);
    return res.status(500).json("Failed to delete subscription");
  }
};

export const deleteAllSubscriptions = async (req, res) => {
  try {
    const result = await Subscription.deleteMany({}); 

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "No subscriptions found to delete" });
    }
    return res.status(200).json({
      msg: `All ${result.deletedCount} subscriptions deleted successfully`
    });
  } catch (error) {
    console.error("error deleting subscriptions:", error);
    return res.status(500).json("Failed to delete subscriptions");
  }
};

export const searchSubscriptions = async (req, res) => {
  try {
    const { service, category, billingCycle, active } = req.query;

    const filter = {};
    if (service) filter.service = new RegExp(service, "i"); // Case-insensitive regex search
    if (category) filter.category = category;
    if (billingCycle) filter.billingCycle = billingCycle;
    if (active !== undefined) filter.active = active === "true";

    const subscriptions = await Subscription.find(filter);

    if (subscriptions.length === 0) {
      return res.status(404).json({ msg: "No subscriptions match the search criteria" });
    }
    return res.status(200).json({ nbHits: subscriptions.length, subscriptions });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return res.status(500).json({ msg: "Failed to fetch subscriptions" });
  }
};
