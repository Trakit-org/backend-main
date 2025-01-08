import Subscription from "../models/subscriptionModel.js";
import generateRandomString from "../utils/generateRandomString.js";

const guestMap = new Map();
const subscriptionMap = new Map();

// TODO: Auth and/or validation for these controllers
export const getAllSubscriptions = async (req, res) => {
  if (!req.user) {
    try {
      const { guestID } = req.cookies;
      if (!guestID) {
        return res.status(404).json({ msg: "Guest ID not found in cookies" });
      }

      const subIDs = guestMap.get(guestID);
      if (!subIDs) {
        return res.status(404).json({ msg: "Guest not found" });
      }

      const subscriptions = [];
      for (const subID of subIDs) {
        const subscription = subscriptionMap.get(subID);
        if (!subscription) {
          console.warn(`guest subscription with ID ${subID} not found`);
          continue;
        }
        subscriptions.push(subscription);
      }

      if (subscriptions.length === 0) {
        return res.status(404).json({ msg: "No subscriptions found for this guest" });
      }

      return res.status(200)
        .json({ nbHits: subscriptions.length, subscriptions });
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
  if (!req.user) {
    try {
      const { id: subscriptionID } = req.params;

      const subscription = subscriptionMap.get(subscriptionID);
      if (!subscription) {
        return res.status(404).json({
          msg: `A guest subscription with ID ${subscriptionID} was not found`
        });
      }

      return res.status(200).json({ subscription });
    } catch (error) {
      console.error("error fetching guest subscription:", error);
      return res.status(500).json({ msg: "Failed to fetch guest subscription" });
    }
  }

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
      const { guestID } = req.cookies;

      if (!guestID) {
        const newGuestID = generateRandomString();
        const newSubscriptionID = generateRandomString();
        guestMap.set(newGuestID, [newSubscriptionID]);
        subscriptionMap.set(newSubscriptionID, data);
        res.cookie('guestID', newGuestID, { httpOnly: true });

        return res.status(201).json({
          msg: "Subscription created successfully",
          subscriptionID: newSubscriptionID,
          data
        });
      }

      const subscriptions = guestMap.get(guestID);
      if (!subscriptions) {
        return res.status(404).json({ msg: "Guest not found" });
      }

      const newSubID = generateRandomString();
      subscriptions.push(newSubID);
      subscriptionMap.set(newSubID, data);

      return res.status(201).json({
        msg: "Subscription created successfully",
        subscriptionID: newSubID,
        data
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
  if (!req.user) {
    try {
      const newData = { ...req.body, };
      const { id: subscriptionID } = req.params;

      if (!subscriptionMap.has(subscriptionID)) {
        return res.status(404).json({
          msg: `A guest subscription with ID ${subscriptionID} was not found`,
        });
      }
      subscriptionMap.set(subscriptionID, {
        ...subscriptionMap.get(subscriptionID),  // Get the current subscription data
        ...newData  // Merge the new data with the existing subscription (partial update)
      });

      const updatedSubscription = subscriptionMap.get(subscriptionID);

      return res.status(200).json({
        msg: "Guest subscription updated successfully", updatedSubscription
      });
    } catch (error) {
      console.error("error updating guest subsription:", error);
      return res.status(500).json({ msg: "Failed to update guest subscription" });
    }
  }

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
  if (!req.user) {
    try {
      const { id: subscriptionID } = req.params;

      const isDeleted = subscriptionMap.delete(subscriptionID);
      if (!isDeleted) {
        return res.status(404).json({
          msg: `A guest subscription with ID ${subscriptionID} was not found`,
        });
      }

      return res.status(200).json({ msg: "Guest subscription deleted successfully" });
    } catch (error) {
      console.error("error deleting guest subscription:", error);
      return res.status(500).json({ msg: "Failed to delete guest subscription" });
    }
  }

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
  if (!req.user) {
    try {
      const { guestID } = req.cookies;
      if (!guestID) {
        return res.status(404).json({ msg: "Guest ID not found in cookies" });
      }

      const subIDs = guestMap.get(guestID);
      if (!subIDs) {
        return res.status(404).json({ msg: "No subscriptions found to delete" });
      }

      for (const subID of subIDs) {
        const isDeleted = subscriptionMap.delete(subID);
        if (!isDeleted) {
          console.warn(`guest subscription with ID ${subID} not found`);
        }
      }

      return res.status(200).json({ msg: "All guest subscriptions deleted successfully" });
    } catch (error) {
      console.error("error deleting guest subscriptions:", error);
      return res.status(500).json({ msg: "Failed to delete guest subscriptions" });
    } 
  }

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
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to access subscription search" });
  }

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
