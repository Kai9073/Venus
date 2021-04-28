require('dotenv').config();

require('./structures/Guild').default;
require('./structures/Message').default;

import Client from './base/Client';
const client = new Client();

client.connect();