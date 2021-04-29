import Client from '../../base/Client';
import Command from '../../base/Command';
import axios from 'axios';
import Discord, { MessageEmbed } from 'discord.js';

export default class PypiCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'pypi',
            aliases: ['pythonpackage', 'pypackage', 'pythonpackageindex'],
            category: 'search',
            description: 'get info of an pypi package',
            usage: 'pypi <query>',
            minArgs: 1,
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        try {
            let { data } = await axios.get(`https://api.snowflakedev.xyz/api/registry/pypi?module=${args[0]}`, {
                headers: {
                    'Authorization': process.env.SNOW_API
                }
            });
            if(!data || data === undefined || data === null) return message.reply(`❌ | No data retrieved from pypi.`);
    
            let embed = new MessageEmbed()
            .setAuthor('Pypi Package Information', data.icon, data.url)
            .setThumbnail(data.icon)
            .setTitle(data.module.name)
            .setURL(data.module.url)
            .setDescription(data.module.description)
            .addField('Version', data.module.version, true)
            .addField('Author', data.module.author || 'None', true)
            .addField('Documentation', data.module.documentation || 'None', true)
            .addField('Homepage', data.module.homepage || 'None', true)
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.reply(embed);
        } catch(err) {
            message.reply('❌ | An error occurred...');
        }
    }
}