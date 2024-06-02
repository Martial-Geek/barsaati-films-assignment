//require dotenv
require("dotenv").config();

var config = {
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: "http",
      host: process.env.PROXYMESH_HOST,
      port: parseInt(process.env.PROXYMESH_PORT),
    },
    bypassList: ["localhost"],
  },
};

chrome.proxy.settings.set({ value: config, scope: "regular" }, function () {});

function callbackFn(details) {
  return {
    authCredentials: {
      username: process.env.PROXYMESH_USER,
      password: process.env.PROXYMESH_PASS,
    },
  };
}

chrome.webRequest.onAuthRequired.addListener(
  callbackFn,
  { urls: ["<all_urls>"] },
  ["blocking"]
);
