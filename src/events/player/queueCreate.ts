import { Queue } from 'discord-player';
import { Message } from 'discord.js';
import Client from '../../base/Client';
import Event from '../../base/Event';

export default class QueueCreateEvent extends Event {
    constructor(client: Client) {
        super(client, 'queueCreate');
    }

    async run(message: Message, queue: Queue) {
        message.channel.send('✅ | Created queue!');
    }
}