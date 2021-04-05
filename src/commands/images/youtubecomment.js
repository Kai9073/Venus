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
            usage: 'youtubecomment [member] <text>'
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() ? message.mentions.users.first().user : args.length ? await message.resolveUser(args[0]) : message.author;
        if(!user) user = message.author;

        let youtube = await img.youtube(user.displayAvatarURL({ format: 'png', size: 512 }), user.username, args.join(' '));
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