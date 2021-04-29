import Command from '../../base/Command';
import axios from 'axios';
import Discord, { MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class DenoCommand extends Command {
    constructor(client: Client) {
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

    async run(message: Discord.Message, args: string[]) {
        try {
            let { data } = await axios.get(`https://api.snowflakedev.xyz/api/registry/deno?module=${args[0]}`, {
                headers: {
                    'Authorization': process.env.SNOW_API
                }
            });
            if(!data || data === undefined || data === null) return message.reply(`❌ | No data retrieved from npm.`);
    
            let embed = new MessageEmbed()
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
        } catch(err) {
            message.reply('❌ | An error occurred...');
        }
    }
}