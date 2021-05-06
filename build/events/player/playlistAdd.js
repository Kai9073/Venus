"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = __importDefault(require("../../base/Event"));
class PlaylistAddEvent extends Event_1.default {
    constructor(client) {
        super(client, 'playlistAdd');
    }
    async run(message, queue, playlist) {
        let embed = new discord_js_1.MessageEmbed()
            .setTitle('Added playlist to queue!')
            .setDescription(`[${playlist.name}](${message.content.split(' ').slice(1)})`)
            .setThumbnail(playlist.thumbnail)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.channel.send(embed);
    }
}
exports.default = PlaylistAddEvent;
