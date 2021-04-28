"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const discord_js_1 = require("discord.js");
const ImageGen_1 = __importDefault(require("../../modules/ImageGen"));
class TCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'hex',
            aliases: ['hexcode', 'hexcolor'],
            category: 'general',
            description: 'Hex color',
            usage: 'hex <hex number>',
            minArgs: 1,
            maxArgs: 1
        });
    }
    async run(message, args) {
        if (!/^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$/i.test(args[0]))
            return message.reply('❌ | Provide a valid hex color!');
        let hex = await ImageGen_1.default.hex(args[0]);
        let attachment = new discord_js_1.MessageAttachment(hex, 'hex.png');
        let embed = new discord_js_1.MessageEmbed()
            .attachFiles([attachment])
            .setImage('attachment://hex.png')
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = TCommand;
