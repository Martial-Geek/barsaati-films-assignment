// server.js
const express = require("express");
const path = require("path");
const getTrendingTopics = require("./scripts/seleniumScript");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("."));

app.get("/run-selenium", (req, res) => {
  // Calling the getTrendingTopics function
  getTrendingTopics()
    .then((data) => {
      // Sending the result back to the client
      res.send(data);
    })
    .catch((error) => {
      console.error("Error running Selenium script:", error);
      res.status(500).send("Error running Selenium script");
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
