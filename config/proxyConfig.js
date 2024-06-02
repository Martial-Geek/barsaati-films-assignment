const proxyChain = require("proxy-chain");

const getAnonymizedProxy = async () => {
  const proxyUsername = process.env.PROXYMESH_USER;
  const proxyPassword = process.env.PROXYMESH_PASS;
  const proxyHost = process.env.PROXYMESH_HOST;
  const proxyPort = process.env.PROXYMESH_PORT;
  const proxyUrl = `http://${proxyUsername}:${proxyPassword}@${proxyHost}:${proxyPort}`;

  const anonymizedProxy = await proxyChain.anonymizeProxy(proxyUrl);
  const parsedUrl = new URL(anonymizedProxy);
  return `${parsedUrl.hostname}:${parsedUrl.port}`;
};

module.exports = getAnonymizedProxy;
