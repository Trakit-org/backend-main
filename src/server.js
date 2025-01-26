import express from "express";
import { initializeReminders, setupCleanupJob } from "./utils/reminderService.js";

// Import configs and middleware
import routeNotFound from "./middleware/routeNotFound.js";
import connectDB from "./config/connectDB.js";
import optionalAuth from "./middleware/optionalAuth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet"; // Security headers
import compression from "compression"; // Response compression
import logger from "./config/logger.js";
import rateLimit from "express-rate-limit";

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

if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode...");

  app.use(
    cors({
      origin: process.env.CLIENT_URL, // Allow only the deployed frontend
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Limit each IP to 100 requests every 15 minutes
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later",
  });

  app.use("/api/", limiter); // Apply to all API routes

  app.use(helmet());
  app.use(compression());

  // Route all console messages to log file in production
  console.log = (...args) => logger.info(args.join(" "));
  console.error = (...args) => logger.error(args.join(" "));
  console.warn = (...args) => logger.warn(args.join(" "));
} else {
  console.log("Running in development mode...");

  app.use(
    cors({
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
}

// Use the routers from all routes with optionalAuth middleware
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
    await setupCleanupJob();
    await initializeReminders();

    app.listen(PORT, () => {
      console.log(`Server running successfully on http://localhost:${PORT}...`);
    });
  } catch (error) {
    console.error("error starting the server:", error);
  }
};

start();
