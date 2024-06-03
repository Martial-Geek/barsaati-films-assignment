const express = require("express");
const path = require("path");
const getTrendingTopics = require("./scripts/seleniumScript");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", async (req, res) => {
  try {
    console.log("Received request to run Selenium script");
    const data = await getTrendingTopics();
    console.log("Selenium script executed successfully:", data);
    res.json(data);
  } catch (error) {
    console.error("Error running Selenium script:", error);
    res.status(500).send("Error running Selenium script");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
