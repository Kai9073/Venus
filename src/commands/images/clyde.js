const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = class ClydeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clyde',
            aliases: ['discordclyde'],
            category: 'images',
            description: 'you dont have nitro so dont use emojis',
            usage: 'clyde <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message, args) {
        let clyde = await img.clyde(args.join(' '));
        let attachment = new MessageAttachment(clyde, 'clyde.png')

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://clyde.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}