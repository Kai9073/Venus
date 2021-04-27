"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const discord_js_1 = require("discord.js");
const moment_1 = __importDefault(require("moment"));
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const os_1 = __importDefault(require("os"));
class BotInfoCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            aliases: ['venusinfo', 'bi'],
            category: 'guild',
            description: 'Venus\'s info',
            usage: 'botinfo'
        });
    }
    async run(message, args) {
        let embed = new discord_js_1.MessageEmbed()
            .setTitle(`${this.client.user?.tag}'s Info`)
            .addField('General', [
            `**❯ Name:** ${this.client.user?.username}`,
            `**❯ Discriminator:** ${this.client.user?.discriminator}`,
            `**❯ ID:** ${this.client.user?.id}`,
            `**❯ Commands:** ${this.client.commands.size.toLocaleString()}`,
            `**❯ Servers:** ${this.client.guilds.cache.size.toLocaleString()}`,
            `**❯ Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
            `**❯ Users:** ${this.client.users.cache.size.toLocaleString()}`,
            `**❯ Created at:** ${moment_1.default(this.client.user?.createdAt).format('LLLL')} (${moment_1.default(this.client.user?.createdAt).fromNow()})`
        ])
            .addField('System', [
            `**❯ Node.js Version:** ${process.version}`,
            `**❯ Discord.js Version:** v${discord_js_1.version}`,
            `**❯ Version:** v${process.env.VERSION}`,
            `**❯ Platform:** ${process.platform}`,
            `**❯ Uptime:** ${pretty_ms_1.default(process.uptime() * 1000, { compact: true })}`,
            `**❯ CPU:**`,
            `\u3000**Cores:** ${os_1.default.cpus().length}`,
            `\u3000**Model:** ${os_1.default.cpus()[0].model}`,
            `\u3000**Speed:** ${os_1.default.cpus()[0].speed}MHz`,
            `**❯ Memory:**`,
            `\u3000**Total:** ${this.client.utils.formatBytes(process.memoryUsage().heapTotal)}`,
            `\u3000**Used:** ${this.client.utils.formatBytes(process.memoryUsage().heapUsed)}`,
            `\u3000**RSS:** ${this.client.utils.formatBytes(process.memoryUsage().rss)}`
        ])
            // @ts-ignore
            .setThumbnail(this.client.user?.displayAvatarURL())
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = BotInfoCommand;
