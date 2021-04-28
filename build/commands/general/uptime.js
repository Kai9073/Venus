"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const ms_1 = __importDefault(require("ms"));
class UptimeCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'uptime',
            aliases: ['onlinetime'],
            category: 'general',
            description: 'check out the uptime of the bot',
            usage: 'uptime'
        });
    }
    async run(message, args) {
        // @ts-ignore
        message.reply(`Bot has been online for **${ms_1.default(this.client.uptime, { compact: true })}**.`);
    }
}
exports.default = UptimeCommand;
