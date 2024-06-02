// utils/database.js
const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false; // Track the connection

const connectToDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "BarsaatiFilms",
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToDB;
