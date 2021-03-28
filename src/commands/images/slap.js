const Command = require('../../base/classes/Command');
const Discord = require('discord.js');
const img = require('../../base/modules/ImageGen');

class SlapCommand extends Command {
    constructor() {
        super({
            name: 'slap',
            aliases: ['slapface', 'batslap'],
            category: 'images',
            description: 'Slap your friends i guess.',
            usage: 'slap <member> [member]',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        let user = message.mentions.members.first(2).length === 2 ? message.mentions.members.first().user : message.author;
        let user2 = message.mentions.members.first(2).length === 2 ? message.mentions.members.first(2)[1].user : message.mentions.members.first().user;

        if(!user2) return message.channel.send(client.sendErrorEmbed(`Please mention one more person.`));

        const attachment = new Discord.MessageAttachment(await img.slap(user?.displayAvatarURL({ format: 'png', size: 512 }), user2.displayAvatarURL({ format: 'png', size: 512 })), 'slap.png');

        let embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://slap.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}

module.exports = SlapCommand;