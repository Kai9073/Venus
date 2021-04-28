"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const ImageGen_1 = __importDefault(require("../../modules/ImageGen"));
const discord_js_1 = require("discord.js");
class PresentationCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'presentation',
            aliases: ['lisapresentation', 'present', 'lisa'],
            category: 'images',
            description: 'oh he speaking fax',
            usage: 'presentation <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }
    async run(message, args) {
        let presentation = await ImageGen_1.default.presentation(args.join(' '));
        let attachment = new discord_js_1.MessageAttachment(presentation, 'presentation.png');
        let embed = new discord_js_1.MessageEmbed()
            .attachFiles([attachment])
            .setImage('attachment://presentation.png')
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = PresentationCommand;
