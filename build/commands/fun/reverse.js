"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class ReverseCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'reverse',
            aliases: [],
            category: 'fun',
            description: '.dedivorp txet eht esreveR',
            usage: 'reverse <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }
    async run(message, args) {
        message.reply(args.join(' ').split('').reverse().join(''));
    }
}
exports.default = ReverseCommand;
