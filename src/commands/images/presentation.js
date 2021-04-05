const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class PresentationCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'presentation',
            aliases: ['lisapresentation', 'present', 'lisa'],
            category: 'images',
            description: 'oh he speaking fax',
            usage: 'presentation <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message, args) {
        let presentation = await img.presentation(args.join(' '));
        let attachment = new MessageAttachment(presentation, 'presentation.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://presentation.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}