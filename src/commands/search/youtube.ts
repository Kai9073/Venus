import Command from '../../base/Command';
import ytsr from 'youtube-sr';
import Discord, { MessageEmbed } from'discord.js';
import ms from'pretty-ms';
import Client from '../../base/Client';

export default class YoutubeCommand extends Command {
    constructor(client: Client) {
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

    async run(message: Discord.Message, args: string[]) {
        try {
            let data = await ytsr.searchOne(args.join(' '), 'video', true);
            data = await ytsr.getVideo(data.url);
            
            let embed = new MessageEmbed()
            .setTitle(data.title)
            .setURL(data.url)
            .setDescription(data.description?.substring(0, 500) + '...' || null)
            .addField('Uploaded at', data.uploadedAt, true)
            .addField('Duration', `${ms(data.duration * 1000, { compact: true, colonNotation: true })}`, true)
            .addField('Views', data.views.toLocaleString(), true)
            .addField('Likes', data.likes.toLocaleString(), true)
            .addField('Dislikes', data.dislikes.toLocaleString(), true)
            .addField('Tags', data.tags.length < 10 ? data.tags.join(', ') : data.tags.length > 5 ? this.client.utils.trimArray(data.tags, 5).join(', ') : 'None', true)
            // @ts-ignore
            .setImage(data.thumbnail?.displayThumbnailURL())
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.reply(embed);
        } catch(err) {
            message.reply('❌ | An error occurred...');
        }
    }
}