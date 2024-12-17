import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).send("Api working perfectly");
});

app.listen(4100, () => {
  console.log("server running sucessfully at http://localhost:4100");
});
