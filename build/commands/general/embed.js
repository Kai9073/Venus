"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class EmbedCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'embed',
            aliases: ['em', 'jsonembed'],
            category: 'general',
            description: '{"description":"Generate your own embed by using JSON"}',
            usage: 'embed <JSON Embed>'
        });
    }
    async run(message, args) {
        try {
            const json = JSON.parse(args.join(' '));
            const { content = '' } = json;
            message.reply(content, { embed: json });
        }
        catch (err) {
            message.reply('❌ | Invalid JSON Body.');
        }
    }
}
exports.default = EmbedCommand;
