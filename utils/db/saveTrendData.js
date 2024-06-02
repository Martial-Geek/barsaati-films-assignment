const connectToDB = require("./database");
const Trend = require("../../models/Trend");

const saveTrendData = async (trendingTopics, ipAddress, uniqueId, endTime) => {
  try {
    await connectToDB();

    const trendData = new Trend({
      uniqueId,
      trend1: trendingTopics[0],
      trend2: trendingTopics[1],
      trend3: trendingTopics[2],
      trend4: trendingTopics[3],
      trend5: trendingTopics[4],
      endTime,
      ipAddress,
    });

    await trendData.save();
    console.log("Trend data saved successfully");
  } catch (error) {
    console.error("Failed to save trend data", error);
  }
};

module.exports = saveTrendData;
