require('dotenv').config();
require('module-alias/register');

require('./structure/Guild');
require('./structure/Message');

const Client = require('./base/Client');
const client = new Client();

client.connect();