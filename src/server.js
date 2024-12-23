import express from "express";

// Import configs and middleware
import routeNotFound from "./middleware/routeNotFound.js";
import connectDB from "./config/connectDB.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

// Load environment variables and configure the server
import dotenv from "dotenv";
dotenv.config();

const app = express();
// Enable JSON body parsing and routeNotFound middleware.
app.use(express.json());
app.use(routeNotFound);

// Use the routers from all routes
app.use("/api/v1/auth", authRoutes); // All auth-related routes
app.use("/api/v1/users", userRoutes); // All user-related routes
app.use("/api/v1/subscriptions", subscriptionRoutes); // All subscription-related routes
app.use("/api/v1/reminders", reminderRoutes); // All reminder-related routes

// Define basic GET route for health check
app.get("/status", (_, res) => {
  return res.status(200).send("API working perfectly!");
});

const PORT = process.env.PORT || 4100;
const MONGO_URI = process.env.MONGO_URI;

// Start the server
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server running sucessfully at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server and/or connecting to the database:", error);
  }
};

start();
