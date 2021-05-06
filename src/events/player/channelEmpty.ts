import { Queue } from 'discord-player';
import { Message } from 'discord.js';
import Client from '../../base/Client';
import Event from '../../base/Event';

export default class NoResultsEvent extends Event {
    constructor(client: Client) {
        super(client, 'noResults');
    }

    async run(message: Message, queue: Queue) {
        message.channel.send('❌ | No one is in the voice channel, stopping the music...');
    }
}