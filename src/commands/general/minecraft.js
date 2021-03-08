const Command = require('command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class MinecraftCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'minecraft',
            aliases: ['mcserver', 'mc', 'minecraftserver'],
            category: 'general',
            description: 'Returns information about the server ip provided.',
            usage: 'minecraft <server ip>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        try {
            const data = await fetch(`https://api.mcsrvstat.us/2/${args[0]}`).catch(err => client.log(err, 2));
            const server = await data.json();
            if(server.online === true) {
                let embed = new MessageEmbed()
                .setAuthor(`${args[0]}'s Server Status`, server.icon)
                .addField('Server IP:', `${server.ip}`)
                .addField('Server Port:', `${server.port}`)
                .addField('Server Version:', `${server.version}`)
                .addField('Players Online:', `${server.players.online}/${server.players.max}`)
                .setColor('GREEN')
                .setFooter('Requested by: ' + message.author.tag, message.author.displayAvatarURL());
                message.channel.send(embed);
            } else if(server.online === false) {
                let embed = new MessageEmbed()
                .setAuthor(`${args[0]}'s Server Status`, server.icon)
                .addField('Server IP:', `${args[0]}`)
                .addField('Server Port:', `${server.port}`)
                .addField('Players Online:', `${server.players.online}/${server.players.max}`)
                .setColor('RED')
                .setFooter('Requested by: ' + message.author.tag, message.author.displayAvatarURL());
                message.channel.send(embed);
            }
        } catch(err) {
            message.channel.send(client.sendErrorEmbed('That server doesn\'t seem to exist.'));
            client.log(err, 1); 
        }
    }
}