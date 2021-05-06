import { Queue } from 'discord-player';
import { Message } from 'discord.js';
import Client from '../../base/Client';
import Event from '../../base/Event';

export default class QueueEndEvent extends Event {
    constructor(client: Client) {
        super(client, 'queueEnd');
    }

    async run(message: Message, queue: Queue) {
        message.channel.send('✅ | Queue ended!');
    }
}