const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class GrayscaleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'grayscale',
            aliases: ['greyscale', 'gray', 'grey'],
            category: 'images',
            description: 'greyscale your or someones pfp',
            usage: 'grayscale',
            maxArgs: 1
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() ? message.mentions.users.first().user : await message.resolveUser(args.join(' '));
        if(!user) user = message.author;

        let grayscale = await img.greyscale(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(grayscale, 'grayscale.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://grayscale.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}