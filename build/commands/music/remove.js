"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class RemoveCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'remove',
            aliases: [],
            category: 'music',
            description: 'wait dont remove me pl-',
            usage: 'remove <number>',
            minArgs: 1,
            maxArgs: 1
        });
    }
    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if (!player)
            return message.reply('❌ | There is no music playing!');
        if (message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID)
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);
        if (isNaN(parseInt(args[0])))
            return message.reply('❌ | Please provide a valid track number!');
        const success = await this.client.player.remove(message, parseInt(args[0]));
        if (success)
            message.reply('⏸ | Paused.');
    }
}
exports.default = RemoveCommand;
