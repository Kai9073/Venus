"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const ImageGen_1 = __importDefault(require("../../modules/ImageGen"));
const discord_js_1 = require("discord.js");
class TriggeredCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'triggered',
            aliases: ['trigger'],
            category: 'images',
            description: 'Apply triggered effect on your pfp',
            usage: 'triggered [member]',
            maxArgs: 1
        });
    }
    async run(message, args) {
        // @ts-ignore
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;
        let trigger = await ImageGen_1.default.trigger(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new discord_js_1.MessageAttachment(trigger, 'trigger.gif');
        let embed = new discord_js_1.MessageEmbed()
            .attachFiles([attachment])
            .setImage('attachment://trigger.gif')
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = TriggeredCommand;
