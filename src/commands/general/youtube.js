const Command = require('command');
const ytsr = require('youtube-sr').default;
const { MessageEmbed } = require('discord.js');

module.exports = class YoutubeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'youtube',
            aliases: ['yt', 'ytvideo', 'youtubesearch', 'ytsearch'],
            category: 'general',
            description: 'Search stuff like eminem illuminati lmao',
            usage: 'youtube <query>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message, args) {
        let data = await ytsr.searchOne(args.join(' '), 'video', true);
        data = await ytsr.getVideo(data.url);

        let embed = new MessageEmbed()
        .setTitle(data.title)
        .setURL(data.url)
        .setDescription(data.description.substring(0, 500) + '...' || null)
        .addField('Uploaded at', data.uploadedAt, true)
        .addField('Duration', `${this.client.utils.msToTime('hh:mm:ss', data.duration * 1000)}`, true)
        .addField('Views', data.views.toLocaleString(), true)
        .addField('Likes', data.likes.toLocaleString(), true)
        .addField('Dislikes', data.dislikes.toLocaleString(), true)
        .addField('Tags', data.tags.length < 10 ? data.tags.join(', ') : data.tags.length > 10 ? this.client.utils.trimArray(data.tags, 5).join(', ') : 'None', true)
        .setImage(data.thumbnail.displayThumbnailURL())
        .setColor('RANDOM')
        message.inlineReply(embed);
    }
}