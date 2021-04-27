"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class OwofyCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'owofy',
            aliases: ['owo'],
            category: 'fun',
            description: 'Make yow message into owo',
            usage: 'owofy <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }
    async run(message, args) {
        message.reply(args.join(' ').replace(/[lr]/g, "w").replace(/(?<=[aeiou])th/g, "ff").replace(/!/g, " òwó!").replace(/~/g, " uwu~"));
    }
}
exports.default = OwofyCommand;
