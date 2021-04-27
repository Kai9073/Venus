"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class TCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'base64',
            aliases: ['b64'],
            category: 'fun',
            description: 'RW5jb2RlIG9yIGRlY29kZSBiYXNlNjQgc3RyaW5ncy4=',
            usage: 'base64 <encode|decode> <text|base64>',
            maxArgs: -1
        });
    }
    async run(message, args) {
        if (!args.length || !/^decode|encode$/.test(args[0].split("\n")[0].toLowerCase())) {
            message.reply('❌ | Use `encode`/`decode` subcommands.');
        }
        else if (args[0].toLowerCase() === 'encode') {
            message.reply(Buffer.from(args.slice(1).join(' ')).toString('base64'));
        }
        else if (args[0].toLowerCase() === 'decode') {
            message.reply(Buffer.from(args.slice(1).join(' '), 'base64').toString('ascii'));
        }
    }
}
exports.default = TCommand;
