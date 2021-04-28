"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require('./structures/Guild').default;
require('./structures/Message').default;
const Client_1 = __importDefault(require("./base/Client"));
const client = new Client_1.default();
client.connect();
