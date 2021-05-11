"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class SkipToCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'skipto',
            aliases: ['jumpto', 'jump'],
            category: 'music',
            description: 'skip to track in queue',
            usage: 'skipto <track number>',
            minArgs: 0,
            maxArgs: 1
        });
        this.skips = null;
    }
    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if (!player)
            return message.reply('❌ | There is no music playing!');
        if (message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID)
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);
        if (isNaN(parseInt(args[0])))
            return message.reply('❌ | Please provide a valid track number!');
        const success = await this.client.player.jump(message, parseInt(args[0]));
        if (success)
            message.reply(`⏩ | Skipped to ${player.tracks[parseInt(args[0])].title}.`);
    }
}
exports.default = SkipToCommand;
