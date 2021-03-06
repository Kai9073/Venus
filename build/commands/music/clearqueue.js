"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class ClearQueueCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'clearqueue',
            aliases: ['cleanqueue'],
            category: 'music',
            description: 'clears queue except the currently playing song',
            usage: 'clearqueue',
            minArgs: 0,
            maxArgs: 0
        });
    }
    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if (!player)
            return message.reply('❌ | There is no music playing!');
        if (message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID)
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);
        const success = await this.client.player.clearQueue(message);
        if (success)
            message.reply('✅ | Cleared queue!');
    }
}
exports.default = ClearQueueCommand;
