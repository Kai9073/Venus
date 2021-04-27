"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const child_process_1 = __importDefault(require("child_process"));
class ExecuteCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'execute',
            aliases: ['exec', 'shell'],
            category: 'dev',
            description: 'Execute a shell command.',
            usage: 'execute <command>',
            minArgs: 1,
            maxArgs: -1,
            devOnly: true
        });
    }
    async run(message, args) {
        try {
            const command = args.join(' ');
            child_process_1.default.exec(command, (error, stdout, stderr) => {
                if (error) {
                    return message.reply(error.message, { code: 'xl' });
                }
                if (stderr) {
                    return message.reply(stderr, { code: 'xl' });
                }
                return message.reply(stdout, { code: 'xl' });
            });
        }
        catch (err) {
            message.reply('❌ | An error occurred...');
        }
    }
}
exports.default = ExecuteCommand;
