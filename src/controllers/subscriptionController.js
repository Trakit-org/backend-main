import Subscription from "../models/subscriptionModel.js";

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({});
    if (subscriptions.length === 0) {
      return res
        .status(404)
        .json({ msg: "There are no subscriptions available at the moment" });
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
      name: req.body.name,
      place: req.body.place,
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
    const Updatedsubscription = await Subscription.findByIdAndUpdate(
      subscriptionID,
      data,
      { new: true }
    );

    if (!Updatedsubscription) {
      return res.status(404).json({
        msg: `A subscription with the id of ${subscriptionID} was not found`,
      });
    }

    return res
      .status(200)
      .json({ msg: "subscription updated successfully", Updatedsubscription });
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
    return res.status(200).json({ msg:'subscription deleted successfully', subscription });
  } catch (error) {
    console.error("error deleting subscription:", error);
    return res.status(500).json("Failed to delete subscription");
  }
};

export const deleteAllSubscriptions = (req, res) => {
  // TODO: Implement logic.
  res.send("Delete all subscriptions");
};

export const searchSubscriptions = (req, res) => {
  // TODO: Implement logic.
  res.send("Search subscriptions");
};
