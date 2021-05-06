"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const discord_js_1 = __importDefault(require("discord.js"));
class QueueCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'queue',
            aliases: ['songlist'],
            category: 'music',
            description: 'Queued 10 songs...',
            usage: 'queue',
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
        let embed = new discord_js_1.default.MessageEmbed()
            .setTitle(`Queue for ${message.guild?.name}`)
            .setDescription(`**Now Playing: [${player.playing.title}](${player.playing.url})**
        ${player.tracks.map((track, i) => {
            return `${i}. [${track.title}](${track.url}) - ${track.requestedBy.toString()}`;
        }).slice(1, 10).join('\n') + `\n\n${player.tracks.length > 10 ? `and ${player.tracks.length - 10} other songs...` : ``}`}`)
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = QueueCommand;
