// models/Trend.js
const mongoose = require("mongoose");

const TrendSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  trend1: { type: String, required: true },
  trend2: { type: String, required: true },
  trend3: { type: String, required: true },
  trend4: { type: String, required: true },
  trend5: { type: String, required: true },
  endTime: { type: Date, required: true },
  ipAddress: { type: String, required: false },
});

module.exports = mongoose.model("Trend", TrendSchema);
