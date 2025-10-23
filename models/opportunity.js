const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  organization: String,
  stipend: String,
  location: String,
  date: Date,
  contactEmail: String,
  websiteLink: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Opportunity", OpportunitySchema);
