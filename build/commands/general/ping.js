"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class PingCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: ['pong', 'pingpong', 'pongping'],
            category: 'general',
            description: 'Ping pong 🏓',
            usage: 'ping'
        });
    }
    async run(message, args) {
        const msg = await message.reply('🏓 Pinging...');
        msg.edit(`🏓 Pong!\nWS Ping: \`${this.client.ws.ping}ms\`\nMessage Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\``);
    }
}
exports.default = PingCommand;
