require('module-alias/register');

const Client = require("./base/Client");

const client = new Client();

client.connect();