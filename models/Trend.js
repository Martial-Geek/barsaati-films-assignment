// models/Trend.js
const mongoose = require("mongoose");

const TrendSchema = new mongoose.Schema({
  uniqueId: { type: String, required: false },
  trend1: { type: String, required: false },
  trend2: { type: String, required: false },
  trend3: { type: String, required: false },
  trend4: { type: String, required: false },
  trend5: { type: String, required: false },
  endTime: { type: Date, required: false },
  ipAddress: { type: String, required: false },
});

module.exports = mongoose.model("Trend", TrendSchema);
