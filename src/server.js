import express from "express";
import routeNotFound from "./middleware/routeNotFound.js";
import subscription from "./routes/subscription.js";
import connectDB from "./config/connectDB.js";

// Load environment variables and configure the server
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4100;
const MONGO_URI = process.env.MONGO_URI

const app = express();

// Define basic GET route for the root endpoint
app.get("/", (req, res) => {
  return res.status(200).send("Api working perfectly");
});

app.use("/api/v1/subscription", subscription);

app.use(routeNotFound);

// Start the server
const start = async () => {
  try {
    await connectDB(MONGO_URI)
    app.listen(PORT, () => {
      console.log(`server running sucessfully at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server and/or connecting to the database:", error);
  }
};

start();
