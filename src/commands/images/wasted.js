const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class WastedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'wasted',
            aliases: ['dead'],
            category: 'images',
            description: 'lets add the wasted overlay on your pfp',
            usage: 'wasted [member]'
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() ? message.mentions.users.first().user : args.length ? await message.resolveUser(args.join(' ')) : message.author;
        if(!user) user = message.author;

        let wasted = await img.wasted(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(wasted, 'wasted.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://wasted.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}