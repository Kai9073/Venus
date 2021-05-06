"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class PlayCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            category: 'music',
            description: 'Play music',
            usage: 'play <query>',
            minArgs: 1,
            maxArgs: -1
        });
    }
    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if (message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID)
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);
        if (!args.length)
            message.channel.send('❌ | Please provide a query!');
        await this.client.player.play(message, args.join(' '), true);
    }
}
exports.default = PlayCommand;
