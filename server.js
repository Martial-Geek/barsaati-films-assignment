// server.js
const express = require("express");
const path = require("path");
const getTrendingTopics = require("./scripts/seleniumScript");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("."));

// app.get("/run-selenium", (req, res) => {
//   // Calling the getTrendingTopics function
//   getTrendingTopics()
//     .then((data) => {
//       // Sending the result back to the client
//       res.send(data);
//     })
//     .catch((error) => {
//       console.error("Error running Selenium script:", error);
//       res.status(500).send("Error running Selenium script");
//     });
// });

// app.get("/", (req, res) => {
//   console.log("Server is running on http://localhost:3000");

//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.all("/", async (req, res) => {
  if (req.method === "GET") {
    res.sendFile(path.join(__dirname, "index.html"));
  } else if (req.method === "POST") {
    try {
      console.log("Received request to run Selenium script");
      const data = await getTrendingTopics();
      console.log("Selenium script executed successfully:", data);
      res.json(data);
    } catch (error) {
      console.error("Error running Selenium script:", error);
      res.status(500).send("Error running Selenium script");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
