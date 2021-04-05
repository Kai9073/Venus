const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class HitlerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hitler',
            aliases: ['adolf', 'adolfthitler'],
            category: 'images',
            description: 'Worse than hitler',
            usage: 'hitler [member]',
            maxArgs: 1
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' '));
        if(!user) user = message.author;

        let hitler = await img.hitler(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(hitler, 'hitler.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://hitler.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}