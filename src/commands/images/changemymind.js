const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class ChangeMyMindCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'changemymind',
            aliases: ['cmm'],
            category: 'images',
            description: 'Venus is great, change my mind',
            usage: 'changemymind <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message, args) {
        let changemymind = await img.changemymind(args.join(' '));
        let attachment = new MessageAttachment(changemymind, 'changemymind.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://changemymind.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}