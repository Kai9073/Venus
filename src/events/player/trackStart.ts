import Client from '../../base/Client';
import Event from '../../base/Event';
import { Message, MessageEmbed } from 'discord.js';
import { Queue, Track } from 'discord-player';

export default class TrackStartEvent extends Event {
    constructor(client: Client) {
        super(client, 'trackStart');
    }

    async run(message: Message, track: Track, queue: Queue) {
        let embed = new MessageEmbed()
        .setTitle(`Now Playing - [${track.duration}]`)
        .setDescription(`[${track.title}](${track.url})`)
        .setThumbnail(track.thumbnail)
        .setColor('RANDOM')
        .setFooter(`Requested by ${track.requestedBy.tag}`, track.requestedBy.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}