const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class YoutubeCommentCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'youtubecomment',
            aliases: ['comment', 'ytcomment'],
            category: 'images',
            description: 'Create a youtube comment',
            usage: 'youtubecomment [member] <text>',
            minArgs: 1,
            maxArgs: 2
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() || message.author;

        let text = message.mentions.users.first() ? args.slice(1).join(' ') : args.join(' ');
        let youtube = await img.youtube(user.displayAvatarURL({ format: 'png', size: 512 }), user.username, text);
        let attachment = new MessageAttachment(youtube, 'youtube.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://youtube.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}