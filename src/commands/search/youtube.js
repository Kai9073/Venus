const Command = require('command');
const ytsr = require('youtube-sr').default;
const { MessageEmbed } = require('discord.js');
const ms = require('pretty-ms');

module.exports = class YoutubeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'youtube',
            aliases: ['yt', 'ytvideo', 'youtubesearch', 'ytsearch'],
            category: 'search',
            description: 'Search stuff like eminem illuminati lmao',
            usage: 'youtube <query>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message, args) {
        try {
            let data = await ytsr.searchOne(args.join(' '), 'video', true);
            data = await ytsr.getVideo(data.url);
            
            let embed = new MessageEmbed()
            .setTitle(data.title)
            .setURL(data.url)
            .setDescription(data.description.substring(0, 500) + '...' || null)
            .addField('Uploaded at', data.uploadedAt, true)
            .addField('Duration', `${ms(data.duration * 1000, { compact: true, colonNotation: true })}`, true)
            .addField('Views', data.views.toLocaleString(), true)
            .addField('Likes', data.likes.toLocaleString(), true)
            .addField('Dislikes', data.dislikes.toLocaleString(), true)
            .addField('Tags', data.tags.length < 10 ? data.tags.join(', ') : data.tags.length > 5 ? this.client.utils.trimArray(data.tags, 5).join(', ') : 'None', true)
            .setImage(data.thumbnail.displayThumbnailURL())
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.inlineReply(embed);
        } catch(err) {
            message.inlineReply(`❌ | No data is retrieved.`);
        }
    }
}