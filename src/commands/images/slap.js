const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class SlapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            aliases: ['slapface', 'batslap'],
            category: 'images',
            description: 'get slapped by batman lmao',
            usage: 'slap <member> [member]',
            minArgs: 1,
            maxArgs: 2
        });
    }

    async run(message, args) {
        let user = message.mentions.members.first(2).length === 2 ? message.mentions.members.first() : message.author;
        let user2 = message.mentions.members.first(2).length === 2 ? message.mentions.members.first(2)[1] : message.mentions.members.first();
        if(!user2) return message.channel.send(`❌ | Please mention another user!`);

        let slap = await img.slap(user.displayAvatarURL({ format: 'png', size: 512 }), user2.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(slap, 'slap.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://slap.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}