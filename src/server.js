import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import subscriptionRoutes from "./routes/subscriptionRoutes.js"
import reminderRoutes from "./routes/reminderRoutes.js"

// Load environment variables and configure the server
import dotenv from "dotenv";
dotenv.config();

const app = express();
// Enable JSON body parsing.
app.use(express.json());

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

// Start the server
const start = async () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
};

start();
