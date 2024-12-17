import express from "express";
import dotenv from 'dotenv'
dotenv.config()

const app = express();

const PORT = process.env.PORT || 4100

app.get("/", (req, res) => {
  return res.status(200).send("Api working perfectly");
});

app.listen(PORT, () => {
  console.log(`server running sucessfully at http://localhost:${PORT}`);
});
