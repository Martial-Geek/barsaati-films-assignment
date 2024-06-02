const axios = require("axios");
require("dotenv").config();

async function getIpAddress() {
  // send an http request along with proxy settings
  try {
    const response = await axios.get("http://api.ipify.org?format=json", {
      proxy: {
        host: process.env.PROXYMESH_HOST,
        port: process.env.PROXYMESH_PORT,
        auth: {
          username: process.env.PROXYMESH_USER,
          password: process.env.PROXYMESH_PASS,
        },
      },
    });
    console.log("Proxy IP Address:", response.data.ip);
    return response.data.ip;
  } catch (error) {
    console.error("Error retrieving proxy IP address:", error.message);
    return null;
  }
}

module.exports = getIpAddress;
