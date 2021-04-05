const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class AffectCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'affect',
            aliases: ['affct'],
            category: 'images',
            description: 'No, it doesn\'t affect my baby',
            usage: 'affect [member]',
            maxArgs: 1
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' '));
        if(!user) user = message.author;

        let affect = await img.affect(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(affect, 'affect.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://affect.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}