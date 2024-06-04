const express = require("express");
const path = require("path");
const getTrendingTopics = require("./scripts/seleniumScript");
const logger = require("./logger");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  logger.addClient(res);

  req.on("close", () => {
    logger.removeClient(res);
  });
});

app.post("/", async (req, res) => {
  try {
    logger.sendLog("Received request to run Selenium script");
    const data = await getTrendingTopics();
    logger.sendLog("Selenium script executed successfully");
    res.json(data);
  } catch (error) {
    logger.sendLog(`Error running Selenium script: ${error}`);
    res.status(500).send("Error running Selenium script");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
