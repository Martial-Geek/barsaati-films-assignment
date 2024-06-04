let clients = [];

const addClient = (res) => {
  clients.push(res);
};

const removeClient = (res) => {
  clients = clients.filter((client) => client !== res);
};

const sendLog = (message) => {
  clients.forEach((client) => client.write(`data: ${message}\n\n`));
};

module.exports = {
  addClient,
  removeClient,
  sendLog,
};
