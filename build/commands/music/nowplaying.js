"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const discord_js_1 = __importDefault(require("discord.js"));
class NowPlayingCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'nowplaying',
            aliases: ['np'],
            category: 'music',
            description: 'Now Playing: Rick Astley - Never Gonna Give You Up',
            usage: 'nowplaying',
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
        const track = await this.client.player.nowPlaying(message);
        let embed = new discord_js_1.default.MessageEmbed()
            .setTitle(track.title)
            .setURL(track.url)
            .setDescription(`${this.client.player.createProgressBar(message, { timecodes: true })}`)
            .setAuthor(track.author)
            .addField('Views', track.views.toLocaleString(), true)
            .addField('Author', track.author, true)
            .addField('Requested By', track.requestedBy.toString(), true)
            .addField('Duration', this.client.utils.msToTime(track.durationMS), true)
            .addField('Volume', `${player.volume}%`, true)
            .addField('Filters activated', `${player.getFiltersEnabled().length}/${player.filters}`, true)
            .setThumbnail(track.thumbnail)
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = NowPlayingCommand;
