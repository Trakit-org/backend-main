import Reminder from "../models/reminderModel.js";

// TODO: Auth and/or validation for these controllers.
export const createReminder = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to create reminders" });
  }

  try {
    const data = { ...req.body, };
    const reminder = await Reminder.create(data);

    return res.status(201).json({ msg: "Reminder created successfully", reminder });
  } catch (error) {
    console.error("error creating reminder:", error);
    return res.status(500).json({ msg: "Failed to create reminder" });
  }
};

export const getReminder = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to access reminders" });
  }

  try {
    const { id: reminderID } = req.params;
    const reminder = await Reminder.findById(reminderID);

    if (!reminder) {
      return res.status(404).json({
        msg: `A reminder with the id ${reminderID} was not found`
      });
    }
    return res.status(200).json({ reminder });
  } catch (error) {
    console.error("error fetching reminder:", error);
    return res.status(500).json({ msg: "Failed to fetch reminder" });
  }
};

export const getAllReminders = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to access reminders" });
  }

  try {
    // Pagination
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const reminders = await Reminder.find({})
      .limit(limit)
      .skip((page - 1) * limit);

    if (reminders.length === 0) {
      return res.status(404).json({ msg: "You have no reminders" });
    }

    return res.status(200).json({ nbHits: reminders.length, reminders });
  } catch (error) {
    console.error("error fetching reminders:", error);
    return res.status(500).json({ msg: "Failed to fetch reminders" });
  }
};

export const updateReminder = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to update reminders" });
  }

  try {
    const { id: reminderID } = req.params;
    const data = { ...req.body, };
    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminderID,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({
        msg: `A reminder with the id ${reminderID} was not found`,
      });
    }

    return res.status(200).json({ msg: "Reminder updated successfully", updatedReminder });
  } catch (error) {
    console.error("error updating reminder:", error);
    return res.status(500).json({ msg: "Failed to update reminder" });
  }
};

export const deleteReminder = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to delete reminders" });
  }

  try {
    const { id: reminderID } = req.params;
    const reminder = await Reminder.findByIdAndDelete(reminderID);

    if (!reminder) {
      return res.status(404).json({
        msg: `A reminder with the id ${reminderID} was not found`
      });
    }
    return res.status(200).json({ msg: "Reminder deleted successfully" });
  } catch (error) {
    console.error("error deleting reminder:", error);
    return res.status(500).json({ msg: "Failed to delete reminder" });
  }
};

export const deleteAllReminders = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to delete reminders" });
  }

  try {
    const result = await Reminder.deleteMany({}); 

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "No reminders found to delete" });
    }
    return res.status(200).json({
      msg: `All ${result.deletedCount} reminders deleted successfully`
    });
  } catch (error) {
    console.error("error deleting reminders:", error);
    return res.status(500).json({ msg: "Failed to delete all reminders" });
  }
};

export const getUpcomingRenewals = async(req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "You must be logged in to access upcoming renewals" });
  }

  try {
    const aWeekAhead = new Date();
    aWeekAhead.setDate(aWeekAhead.getDate() + 7);

    const upcomingReminders = await Reminder
      .find({
        "subscription.user": req.user._id,
        reminderTime: { $lte: aWeekAhead },
      })
      .populate("subscription")
      .sort({ reminderTime: 1 });

    if (upcomingReminders.length === 0) {
      return res.status(404).json({ msg: "No reminders found within the next week" });
    }

    return res.status(200).json({ nbHits: upcomingReminders.length, upcomingReminders });
  } catch (error) {
    console.error("error retrieving upcoming reminders:", error);
    return res.status(500).json({ msg: "Failed to retrieve upcoming reminders" });
  }
}
