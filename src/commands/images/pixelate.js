const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class PixelateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pixelate',
            aliases: ['pixel'],
            category: 'images',
            description: 'oh who is that',
            usage: 'pixelate [member]'
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() ? message.mentions.users.first().user : args.length ? await message.resolveUser(args.join(' ')) : message.author;
        if(!user) user = message.author;

        let pixelate = await img.pixelate(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(pixelate, 'pixelate.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://pixelate.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}