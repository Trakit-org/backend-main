import express from "express";
import { initializeReminders, setupCleanupJob } from "./utils/reminderService.js";

// Import configs and middleware
import routeNotFound from "./middleware/routeNotFound.js";
import connectDB from "./config/connectDB.js";
import optionalAuth from "./middleware/optionalAuth.js";
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

// Load environment variables and configure the server
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4100;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
// Enable JSON body and cookie parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use the routers from all routes
app.use("/api/v1/auth", optionalAuth, authRoutes);
app.use("/api/v1/users", optionalAuth, userRoutes);
app.use("/api/v1/subscriptions", optionalAuth, subscriptionRoutes);
app.use("/api/v1/reminders", optionalAuth, reminderRoutes);

// Define basic GET route for health check
app.get("/", (req, res) => {
  return res.status(200).send("API working perfectly!");
});

app.use(routeNotFound);

// Start the server
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    console.log("connected to MongoDB...");

    await setupCleanupJob();

    await initializeReminders();
    console.log("reminders initialized...");

    app.listen(PORT, () => {
      console.log(`server running successfully on http://localhost:${PORT}...`);
    });
  } catch (error) {
    console.error("error starting the server:", error);
  }
};

start();
