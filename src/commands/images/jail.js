const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class JailCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'jail',
            aliases: ['prison', 'arrest', 'nab'],
            category: 'images',
            description: 'arrest him',
            usage: 'jail [member]'
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() ? message.mentions.users.first().user : args.length ? await message.resolveUser(args.join(' ')) : message.author;
        if(!user) user = message.author;

        let jail = await img.jail(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(jail, 'jail.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://jail.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}