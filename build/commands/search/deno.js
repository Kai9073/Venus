"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
class DenoCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'deno',
            aliases: [],
            category: 'search',
            description: 'get info of an deno registry package',
            usage: 'deno <query>',
            minArgs: 1,
            maxArgs: 1
        });
    }
    async run(message, args) {
        try {
            let { data } = await axios_1.default.get(`https://api.snowflakedev.xyz/api/registry/deno?module=${args[0]}`, {
                headers: {
                    'Authorization': process.env.SNOW_API
                }
            });
            if (!data || data === undefined || data === null)
                return message.reply(`❌ | No data retrieved from npm.`);
            let embed = new discord_js_1.MessageEmbed()
                .setAuthor('Deno Package Information', data.icon, data.url)
                .setThumbnail(data.icon)
                .setTitle(data.module.name)
                .setURL(data.module.url)
                .setDescription(data.module.description)
                .addField('Version', data.module.version, true)
                .addField('Author', `**[${data.module.developer.name}](${data.module.developer.url})**`, true)
                .addField('Stars', data.module.stars + ':star:' || '0 :star:', true)
                .addField('Github', `**${data.module.github}**`, true)
                .setColor('RANDOM')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
            message.reply(embed);
        }
        catch (err) {
            message.reply('❌ | An error occurred...');
        }
    }
}
exports.default = DenoCommand;
