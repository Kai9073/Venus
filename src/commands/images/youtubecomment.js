const Command = require('../../base/classes/Command');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const img = require('../../base/modules/ImageGen');

class YoutubeCommand extends Command {
    constructor() {
        super({
            name: 'youtubecomment',
            aliases: ['ytcomment', 'comment'],
            category: 'images',
            description: 'Generate a youtube comment.',
            usage: 'youtube [user] <comment>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        let user = message.mentions.members.first() ? message.mentions.members.first().user : client.resolveUser(args[0]);
        if(!user) user = message.author;

        const attachment = new MessageAttachment(await img.youtube(user.displayAvatarURL({ format: 'png', size: 512 }), user.username, args.join(' ')), 'youtubecomment.png');
    
        let embed = new MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://youtubecomment.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}

module.exports = YoutubeCommand;