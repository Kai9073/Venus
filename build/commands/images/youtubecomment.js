"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const ImageGen_1 = __importDefault(require("../../modules/ImageGen"));
const discord_js_1 = require("discord.js");
class YoutubeCommentCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'youtubecomment',
            aliases: ['comment', 'ytcomment'],
            category: 'images',
            description: 'Create a youtube comment',
            usage: 'youtubecomment [member] <text>',
            minArgs: 2,
            maxArgs: -1
        });
    }
    async run(message, args) {
        // @ts-ignore
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;
        let text = message.mentions.users.first() ? args.slice(1).join(' ') : args.join(' ');
        let youtube = await ImageGen_1.default.youtube(user.displayAvatarURL({ format: 'png', size: 512 }), user.username, text);
        let attachment = new discord_js_1.MessageAttachment(youtube, 'youtube.png');
        let embed = new discord_js_1.MessageEmbed()
            .attachFiles([attachment])
            .setImage('attachment://youtube.png')
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = YoutubeCommentCommand;
