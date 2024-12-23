import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ msg: "get all your subscriptions" });
});

router.get("/:id", (req, res) => {
  return res.status(200).json({ msg: "Get single subscription" });
});

router.post("/", (req, res) => {
  return res.status(201).json({ msg: "Add a new subscription" });
});

router.patch("/:id", (req, res) => {
  return res.status(200).json({ msg: "Update a subscription" });
});

router.delete("/:id", (req, res) => {
  return res.status(200).json({ msg: "Delete a subscription" });
});

export default router;
