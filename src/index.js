require('dotenv').config();

const Client = require('./base/Client');

const client = new Client();

client.connect();