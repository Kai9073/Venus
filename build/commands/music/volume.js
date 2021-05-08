"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class VolumeCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'volume',
            aliases: [],
            category: 'music',
            description: 'never gONNA🔊GIVE🔊YOU🔊UP',
            usage: 'volume <1-100>',
            minArgs: 0,
            maxArgs: 1
        });
    }
    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if (!player)
            return message.reply('❌ | There is no music playing!');
        if (message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID)
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);
        if (!args.length)
            return message.reply(`🔊 | Volume: ${player.volume}%`);
        if (isNaN(parseInt(args[0])))
            return message.reply('❌ | Please provide a valid number!');
        if ((parseInt(args[0]) > 100) || (parseInt(args[0]) < 1))
            return message.reply('❌ | Volume must be from 1-100%!');
        const success = await this.client.player.setVolume(message, parseInt(args[0]));
        if (success)
            message.reply(`✅ | Volume set to ${args[0]}%!`);
    }
}
exports.default = VolumeCommand;
