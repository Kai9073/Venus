import { Queue } from 'discord-player';
import { Message, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';
import Event from '../../base/Event';

export default class PlaylistAddEvent extends Event {
    constructor(client: Client) {
        super(client, 'playlistAdd');
    }

    async run(message: Message, queue: Queue, playlist: any) {
        let embed = new MessageEmbed()
        .setTitle('Added playlist to queue!')
        .setDescription(`**[${playlist.name}](${message.content.split(' ').slice(1)})**`)
        .setThumbnail(playlist.thumbnail)
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}