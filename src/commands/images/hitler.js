const Command = require('command');
const Discord = require('discord.js');
const canvacord = require('canvacord');

class HitlerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hitler',
            aliases: [],
            category: 'images',
            description: 'Generate a "Hitler" meme.',
            usage: 'hitler [member]',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        const user = message.mentions.members.first().user.displayAvatarURL({ format: 'png' }) || message.author.displayAvatarURL({ format: 'png' });
        const hitler = await canvacord.Canvas.hitler(user);
    
        const attachment = new Discord.MessageAttachment(hitler, 'hitler.png');
    
        let embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://hitler.png');
        message.channel.send(embed);
    }
}

module.exports = HitlerCommand;
