"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const ImageGen_1 = __importDefault(require("../../modules/ImageGen"));
const discord_js_1 = require("discord.js");
class ClydeCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'clyde',
            aliases: ['discordclyde'],
            category: 'images',
            description: 'you dont have nitro so dont use emojis',
            usage: 'clyde <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }
    async run(message, args) {
        let clyde = await ImageGen_1.default.clyde(args.join(' '));
        let attachment = new discord_js_1.MessageAttachment(clyde, 'clyde.png');
        let embed = new discord_js_1.MessageEmbed()
            .attachFiles([attachment])
            .setImage('attachment://clyde.png')
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = ClydeCommand;
