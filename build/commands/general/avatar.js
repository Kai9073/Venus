"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const discord_js_1 = require("discord.js");
class AvatarCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['pfp', 'profilepic', 'profilepicture'],
            category: 'general',
            description: 'Read the name of the command stupid',
            usage: 'avatar [member]'
        });
    }
    async run(message, args) {
        let user = message.mentions.users.first() || message.author;
        let embed = new discord_js_1.MessageEmbed()
            .setTitle(`${user.tag}'s Avatar`)
            .setImage(user.displayAvatarURL({ size: 512, dynamic: true }))
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = AvatarCommand;
