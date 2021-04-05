const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class WantedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'wanted',
            aliases: [],
            category: 'images',
            description: 'you are wanted',
            usage: 'wanted [member]',
            maxArgs: 1
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() ? message.mentions.users.first().user : await message.resolveUser(args.join(' '));
        if(!user) user = message.author;

        let wanted = await img.wanted(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(wanted, 'wanted.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://wanted.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}