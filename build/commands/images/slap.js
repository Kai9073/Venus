"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const ImageGen_1 = __importDefault(require("../../modules/ImageGen"));
const discord_js_1 = require("discord.js");
class SlapCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'slap',
            aliases: ['slapface', 'batslap'],
            category: 'images',
            description: 'get slapped by batman lmao',
            usage: 'slap <member> [member]',
            minArgs: 1,
            maxArgs: 2
        });
    }
    async run(message, args) {
        let user = message.mentions.members?.first(2).length === 2 ? message.mentions.members.first()?.user : message.author;
        let user2 = message.mentions.members?.first(2).length === 2 ? message.mentions.members.first(2)[1].user : message.mentions.members?.first()?.user;
        if (!user2)
            return message.channel.send(`❌ | Please mention another user!`);
        // @ts-ignore
        let slap = await ImageGen_1.default.slap(user.displayAvatarURL({ format: 'png', size: 512 }), user2.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new discord_js_1.MessageAttachment(slap, 'slap.png');
        let embed = new discord_js_1.MessageEmbed()
            .attachFiles([attachment])
            .setImage('attachment://slap.png')
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = SlapCommand;
