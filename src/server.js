import express from "express";
import routeNotFound from "./middleware/routeNotFound.js";
import subscription from "./routes/subscription.js";

// Load environment variables and configure the server
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4100;

const app = express();

// Define basic GET route for the root endpoint
app.get("/", (req, res) => {
  return res.status(200).send("Api working perfectly");
});

app.use("/api/v1/subscription", subscription);

app.use(routeNotFound);

// Start the server
const start = () => {
  app.listen(PORT, () => {
    console.log(`server running sucessfully at http://localhost:${PORT}`);
  });
};

start();
