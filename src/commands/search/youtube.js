const ytsr = require("youtube-sr");
const { MessageEmbed } = require("discord.js");
const Command = require("../../base/classes/Command");

class YoutubeCommand extends Command { 
    constructor() {
        super({
            name: 'youtube',
            aliases: ['ytsearch', 'youtubesearch', 'yt'],
            category: 'search',
            description: 'Search a video in youtube.',
            usage: 'youtube <query>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        let result = await ytsr.searchOne(args.join(' '), 'video', true);
        result = await ytsr.getVideo(result.url);
        
        let embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Youtube Search')
        .addField('Title', `[${result.title}](${result.url})`, true)
        .addField('Author', `[${result.channel.name}](${result.channel.url})`, true)
        .addField('Views', result.views.toLocaleString(), true)
        .addField('Duration', result.durationFormatted, true)
        .setImage(result.thumbnail.displayThumbnailURL("ultrares"))
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}

module.exports = YoutubeCommand;