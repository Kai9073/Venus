"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const morse_1 = __importDefault(require("../../assets/data/morse"));
class MorseCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'morse',
            aliases: ['morsecode'],
            category: 'fun',
            description: '-.-. --- -. ...- . .-. - / .- / ... - .-. .. -. --. / - --- / -- --- .-. ... . .-.-.- (Convert a string to morse.)',
            usage: 'morse <encode|decode> <text|morse>',
            maxArgs: -1
        });
    }
    async run(message, args) {
        if (!args.length || !/^decode|encode$/.test(args[0].split("\n")[0].toLowerCase())) {
            message.reply('❌ | Use `encode`/`decode` subcommands.');
        }
        else if (args[0].toLowerCase() === 'encode') {
            const text = args.slice(1).join(' ').split('');
            const arr = [];
            for (let char of text) {
                // @ts-ignore
                arr.push(morse_1.default[char]);
            }
            message.reply(arr.join(' '));
        }
        else if (args[0].toLowerCase() === 'decode') {
            const text = args.slice(1).join(' ').split(' ');
            if (/[A-Za-z]/.test(text.join(' ')))
                return message.reply('❌ | Use the `encode` subcommand to encode a string to morse code.');
            const arr = [];
            for (let char of text) {
                let table = Object.values(morse_1.default);
                const index = table.findIndex(x => x === char);
                if (index !== -1)
                    arr.push(Object.keys(morse_1.default)[index]);
            }
            message.reply(arr.join(''));
        }
    }
}
exports.default = MorseCommand;
