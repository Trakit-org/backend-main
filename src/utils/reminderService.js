import cron from "node-cron";
import Reminder from "../models/reminderModel.js";
import { sendReminderEmail } from "./mailSender.js";

const MAX_RETRIES = 3;
const RETRY_DELAY = 5 * 60 * 1000;

export const scheduleReminder = async (reminder) => {
  const scheduledTime = new Date(reminder.reminderTime);
  // Create cron pattern from the date
  const [min, hour, date, month] = [
    scheduledTime.getMinutes(),
    scheduledTime.getHours(),
    scheduledTime.getDate(),
    scheduledTime.getMonth() + 1,
  ];

  const cronPattern = `${min} ${hour} ${date} ${month} *`;

  cron.schedule(cronPattern, async () => {
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
      try {
        // Fetch the reminder with subscription details
        const reminderWithSub = await Reminder.findById(reminder._id)
          .populate({
            path: "subscription",
            populate: { path: "user" } // Get user details through subscription
          });
        if (!reminderWithSub || !reminderWithSub.active) {
          console.log(`Reminder with ID ${reminder._id} no longer active or valid`);
          return;
        }

        const user = reminderWithSub.subscription.user;
        if (!user.enableNotifications) {
          console.log(`User with ID ${user._id} has notifications disabled`);
          return;
        }

        // Send the email
        await sendReminderEmail(
          user.email,
          "Subscription Reminder",
          `
          <h1>Reminder</h1>
          <p>${reminderWithSub.message || "Time to check your subscription!"}</p>
          `
        );

        // Update reminder status
        reminderWithSub.sent = true;
        reminderWithSub.sentTime = new Date();
        await reminderWithSub.save();

        console.log("Reminder sent successfully");
        return;
      } catch (error) {
        attempts++;
        console.error(`Failed attempt ${attempts} of ${MAX_RETRIES}:`, error);

        if (attempts < MAX_RETRIES) {
          // Wait before trying again
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
      }
    }

    console.error(`Failed to send reminder after ${MAX_RETRIES} attempts`);
  });
};

// Initialize existing reminders when server starts
export const initializeReminders = async () => {
  const pendingReminders = await Reminder.find({
    sent: false,
    active: true
  });

  pendingReminders.forEach(scheduleReminder);
  console.log("Reminders initialized");
};

export const setupCleanupJob = async () => {
  // Run at midnight (GMT) every day
  cron.schedule("0 1 * * *", async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Delete old, sent reminders
      const deleteResult = await Reminder.deleteMany({
        sent: true,
        sentTime: { $lt: thirtyDaysAgo },
      });
      console.log(`${deleteResult.deletedCount} old reminders deleted`);

      // Deactivate expired, unsent reminders
      const updateResult = await Reminder.updateMany(
        {
          sent: false,
          reminderTime: { $lt: new Date() }
        },
        {
          $set: { active: false }
        }
      );
      console.log(`${updateResult.modifiedCount} expired reminders deactivated`);

      console.log("Reminder cleanup completed successfully");
    } catch (error) {
      console.error("Failed to cleanup reminders:", error);
    }
  });

  console.log("Reminder cleanup scheduled for midnight (GMT)");
};
