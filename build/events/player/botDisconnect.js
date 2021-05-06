"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../base/Event"));
class BotDisconnectEvent extends Event_1.default {
    constructor(client) {
        super(client, 'botDisconnect');
    }
    async run(message) {
        message.channel.send('❌ | I have been disconnected from the voice channel!');
    }
}
exports.default = BotDisconnectEvent;
