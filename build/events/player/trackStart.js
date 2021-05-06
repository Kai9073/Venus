"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../base/Event"));
const discord_js_1 = require("discord.js");
class TrackStartEvent extends Event_1.default {
    constructor(client) {
        super(client, 'trackStart');
    }
    async run(message, track, queue) {
        let embed = new discord_js_1.MessageEmbed()
            .setTitle(`Now Playing - [${track.duration}]`)
            .setDescription(`[${track.title}](${track.url})`)
            .setThumbnail(track.thumbnail)
            .setColor('RANDOM')
            .setFooter(`Requested by ${track.requestedBy.tag}`, track.requestedBy.displayAvatarURL())
            .setTimestamp();
        message.channel.send(embed);
    }
}
exports.default = TrackStartEvent;
