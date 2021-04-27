"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class EvalCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'eval',
            aliases: ['evaluate'],
            category: 'dev',
            description: 'Evaluates provided JS Code.',
            usage: 'eval <code>',
            minArgs: 1,
            maxArgs: -1,
            devOnly: true
        });
    }
    async run(message, args) {
        let code = args.join(' ');
        try {
            let ev = eval(code);
            ev = this.client.utils.cleanText(ev);
            return message.reply(ev, { code: 'sh', split: true });
        }
        catch (err) {
            return message.reply(err, { code: 'sh', split: true });
        }
    }
}
exports.default = EvalCommand;
