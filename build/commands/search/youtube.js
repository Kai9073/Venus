"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const youtube_sr_1 = __importDefault(require("youtube-sr"));
const discord_js_1 = require("discord.js");
const pretty_ms_1 = __importDefault(require("pretty-ms"));
class YoutubeCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'youtube',
            aliases: ['yt', 'ytvideo', 'youtubesearch', 'ytsearch'],
            category: 'search',
            description: 'Search stuff like eminem illuminati lmao',
            usage: 'youtube <query>',
            minArgs: 1,
            maxArgs: -1
        });
    }
    async run(message, args) {
        try {
            let data = await youtube_sr_1.default.searchOne(args.join(' '), 'video', true);
            data = await youtube_sr_1.default.getVideo(data.url);
            let embed = new discord_js_1.MessageEmbed()
                .setTitle(data.title)
                .setURL(data.url)
                .setDescription(data.description?.substring(0, 500) + '...' || null)
                .addField('Uploaded at', data.uploadedAt, true)
                .addField('Duration', `${pretty_ms_1.default(data.duration * 1000, { compact: true, colonNotation: true })}`, true)
                .addField('Views', data.views.toLocaleString(), true)
                .addField('Likes', data.likes.toLocaleString(), true)
                .addField('Dislikes', data.dislikes.toLocaleString(), true)
                .addField('Tags', data.tags.length < 10 ? data.tags.join(', ') : data.tags.length > 5 ? this.client.utils.trimArray(data.tags, 5).join(', ') : 'None', true)
                // @ts-ignore
                .setImage(data.thumbnail?.displayThumbnailURL())
                .setColor('RANDOM')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
            message.reply(embed);
        }
        catch (err) {
            message.reply(`❌ | No data is retrieved.`);
        }
    }
}
exports.default = YoutubeCommand;
