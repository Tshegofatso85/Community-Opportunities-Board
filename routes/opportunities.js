const express = require("express");
const router = express.Router();
const Opportunity = require("../models/opportunity");

// Get all opportunities
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const skip = parseInt(req.query.skip) || 0;

    const opportunities = await Opportunity.find()
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);

    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new opportunity (you can use Postman or a simple admin script later)
router.post("/", async (req, res) => {
  try {
    const opportunity = new Opportunity(req.body);
    await opportunity.save();
    res.json({ message: "Opportunity added successfully", opportunity });
  } catch (err) {
    res.status(400).json({ message: "Error adding opportunity" });
  }
});

module.exports = router;
