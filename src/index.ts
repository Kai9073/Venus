require('dotenv').config();
require('module-alias/register');

require('./structure/Guild');
require('./structure/Message');

import Client from './base/Client';
const client = new Client();

client.connect();