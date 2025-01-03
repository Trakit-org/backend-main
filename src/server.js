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

const PORT = process.env.PORT || 4100;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
// Enable JSON body parsing middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the routers from all routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/subscription", subscriptionRoutes);
app.use("/api/v1/reminder", reminderRoutes);

// Define basic GET route for health check
app.get("/", (req, res) => {
  return res.status(200).send("API working perfectly!");
});

app.use(routeNotFound);

// Start the server
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server running sucessfully at address http://localhost:${PORT} and connected to DB`);
    });
  } catch (error) {
    console.error("Error starting the server and/or connecting to the database:", error);
  }
};

start();
