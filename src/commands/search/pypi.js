const Command = require('command');
const axios = require('axios').default;
const { MessageEmbed } = require('discord.js');

module.exports = class PypiCommand extends Command {
    constructor(client) {
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

    async run(message, args) {
        let { data } = await axios.get(`https://api.snowflakedev.xyz/api/registry/pypi?module=${args[0]}`, {
            headers: {
                'Authorization': process.env.SNOW_API
            }
        });
        if(!data || data === undefined || data === null) return message.inlineReply(`❌ | No data retrieved from pypi.`);

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
        message.inlineReply(embed);
    }
}