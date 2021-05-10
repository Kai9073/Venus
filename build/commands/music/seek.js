"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class SeekCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'seek',
            aliases: ['fastforward'],
            category: 'music',
            description: 'never gonna- we known each other for so long...',
            usage: 'seek <time>',
            minArgs: 1,
            maxArgs: -1
        });
    }
    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if (!player)
            return message.reply('❌ | There is no music playing!');
        if (message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID)
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);
        let seek = this.client.utils.timeToMs(args.join(' '));
        if (typeof seek !== 'number' || seek === null)
            return message.reply('❌ | Wrong format/input! Example: `00:55`, `50`');
        await this.client.player.seek(message, seek);
        message.reply(`⏩ | Set position to ${this.client.utils.msToTime('hh:mm:ss', seek)}.`);
    }
}
exports.default = SeekCommand;
