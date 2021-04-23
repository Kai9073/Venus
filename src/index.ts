require('dotenv').config();

import Client from './base/Client';
const client = new Client();

client.connect();