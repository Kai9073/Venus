import Client from '../../base/Client';
import Event from '../../base/Event';
import { Message, MessageEmbed } from 'discord.js';
import { Queue, Track } from 'discord-player';

export default class TrackAddEvent extends Event {
    constructor(client: Client) {
        super(client, 'trackAdd');
    }

    async run(message: Message, queue: Queue, track: Track) {
        let embed = new MessageEmbed()
        .setTitle(`Added to queue - [${track.duration}]`)
        .setDescription(`[${track.title}](${track.url})`)
        .setThumbnail(track.thumbnail)
        .setColor('RANDOM')
        .setFooter(`Requested by ${track.requestedBy.tag}`, track.requestedBy.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}