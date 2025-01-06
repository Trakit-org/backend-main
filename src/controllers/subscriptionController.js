import Subscription from "../models/subscriptionModel.js";
import generateRandomString from "../utils/generateRandomString.js";

const guestMap = new Map();

// TODO: Auth and/or validation for these controllers
export const getAllSubscriptions = async (req, res) => {
  if (!req.user) {
    try {
      const { guestId } = req.cookies;
      if (!guestId) {
        return res.status(404).json({ msg: "Guest ID not found" });
      }

      const guest = guestMap.get(guestId);
      if (!guest || guest.subscriptions.length === 0) {
        return res.status(404).json({ msg: "Guest or subscriptions not found" });
      }

      return res.status(200)
        .json({ nbHits: guest.subscriptions.length, subscriptions: guest.subscriptions });
    } catch (error) {
      console.error("error fetching guest subscriptions:", error);
      return res.status(500).json({ msg: "Failed to fetch guest subscriptions" });
    } 
  }

  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const subscriptions = await Subscription.find({})
      .limit(limit)
      .skip((page - 1) * limit);
    if (subscriptions.length === 0) {
      return res
        .status(404)
        .json({ msg: "You have no subscriptions" });
    }
    return res
      .status(200)
      .json({ nbHits: subscriptions.length, subscriptions });
  } catch (error) {
    console.error("error fetching subscriptions:", error);
    return res.status(500).json({ msg: "Failed to fetch subscriptions" });
  }
};

export const getSubscription = async (req, res) => {
  try {
    const { id: subscriptionID } = req.params;
    const subscription = await Subscription.findById(subscriptionID);

    if (!subscription) {
      return res.status(404).json({
        msg: `A subscription with the id of ${subscriptionID} was not found`
      });
    }
    return res.status(200).json({ subscription });
  } catch (error) {
    console.error("error fetching subscription:", error);
    return res.status(500).json({ msg: "Failed to fetch subscription" });
  }
};

export const createSubscription = async (req, res) => {
  if (!req.user) {
    try {
      const data = { ...req.body, };
      const { guestId } = req.cookies;

      if (!guestId) {
        const newGuestId = generateRandomString();
        guestMap.set(newGuestId, { subscriptions: [data] });
        res.cookie('guestId', newGuestId, { httpOnly: true });

        const guest = guestMap.get(newGuestId);
        return res.status(201).json({
          msg: "Subscription created successfully", subscriptions: guest.subscriptions
        });
      }

      const guest = guestMap.get(guestId);

      if (!guest) {
        return res.status(404).json({ msg: "Guest not found" });
      }

      guest.subscriptions.push(data);

      return res.status(201).json({
        msg: "Subscription created successfully", subscriptions: guest.subscriptions
      });
    } catch (error) {
      console.error("error creating guest subscription:", error);
      return res.status(500).json({ msg: "Failed to create guest subscription" });
    }
  }

  try {
    const data = {
      ...req.body,
    };
    const subscription = await Subscription.create(data);

    return res
      .status(201)
      .json({ msg: "Subscription created successfully", subscription });
  } catch (error) {
    console.error("error creating subscription:", error);
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
    return res.status(200).json({ msg: "Subscription deleted successfully" });
  } catch (error) {
    console.error("error deleting subscription:", error);
    return res.status(500).json({ msg: "Failed to delete subscription" });
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
    return res.status(500).json({ msg: "Failed to delete all subscriptions" });
  }
};

export const searchSubscriptions = async (req, res) => {
  try {
    const { service, category, billingCycle, active } = req.query;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const filter = {};
    if (service) filter.service = new RegExp(service, "i"); // Case-insensitive regex search
    if (category) filter.category = category;
    if (billingCycle) filter.billingCycle = billingCycle;
    if (active !== undefined) filter.active = active === "true";

    const subscriptions = await Subscription.find(filter)
      // Pagination
      .limit(limit)
      .skip((page - 1) * limit);

    if (subscriptions.length === 0) {
      return res.status(404).json({ msg: "No subscriptions match the search criteria" });
    }
    return res.status(200).json({ nbHits: subscriptions.length, subscriptions });
  } catch (error) {
    console.error("error fetching subscriptions:", error);
    return res.status(500).json({ msg: "Failed to fetch subscriptions" });
  }
};
