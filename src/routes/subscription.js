import express from "express";

const router = express.Router();

router.get("/api/v1/subscription", (req, res) => {
  return res.status(200).json({ msg: "get all your subscriptions" });
});

export default router;
