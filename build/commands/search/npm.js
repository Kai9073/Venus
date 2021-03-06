"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
class NPMCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'npm',
            aliases: ['nodepackage', 'nodejspackage', 'nodepackagemanager'],
            category: 'search',
            description: 'get info of an npm package',
            usage: 'npm <query>',
            minArgs: 1,
            maxArgs: 1
        });
    }
    async run(message, args) {
        try {
            let { data } = await axios_1.default.get(`https://api.snowflakedev.xyz/api/registry/npm?module=${args[0]}`, {
                headers: {
                    'Authorization': process.env.SNOW_API
                }
            });
            if (!data || data === undefined || data === null)
                return message.reply(`❌ | No data retrieved from npm.`);
            let embed = new discord_js_1.MessageEmbed()
                .setAuthor('NPM Package Information', data.icon, data.url)
                .setThumbnail(data.icon)
                .setTitle(data.module.name)
                .setURL(data.module.url)
                .setDescription(data.module.description)
                .addField('Version', data.module.version, true)
                .addField('Main', data.module.main || 'None', true)
                .addField('License', data.module.license || 'None', true)
                .addField('Author', data.module.author || 'None', true)
                .addField('Maintainers', data.module.maintainers.length < 5 && data.module.maintainers.length !== 0 ? data.module.maintainers.join(', ') : data.module.maintainers.length > 5 ? this.client.utils.trimArray(data.module.maintainers, 5).join(', ') : 'None', true)
                .addField('Dependencies', data.module.dependencies.length < 5 && data.module.dependencies.length !== 0 ? data.module.dependencies.join(', ') : data.module.dependencies.length > 5 ? this.client.utils.trimArray(data.module.dependencies, 5).join(', ') : 'None', true)
                .addField('Repository', data.module.repository.url || 'None')
                .addField('Runkit', data.runkit)
                .setImage(data.module.banner)
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
exports.default = NPMCommand;
