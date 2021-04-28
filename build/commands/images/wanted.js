"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const ImageGen_1 = __importDefault(require("../../modules/ImageGen"));
const discord_js_1 = require("discord.js");
class WantedCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'wanted',
            aliases: [],
            category: 'images',
            description: 'you are wanted',
            usage: 'wanted [member]',
            maxArgs: 1
        });
    }
    async run(message, args) {
        // @ts-ignore
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;
        let wanted = await ImageGen_1.default.wanted(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new discord_js_1.MessageAttachment(wanted, 'wanted.png');
        let embed = new discord_js_1.MessageEmbed()
            .attachFiles([attachment])
            .setImage('attachment://wanted.png')
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = WantedCommand;
