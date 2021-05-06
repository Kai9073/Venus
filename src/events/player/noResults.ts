import { Message } from 'discord.js';
import Client from '../../base/Client';
import Event from '../../base/Event';

export default class NoResultsEvent extends Event {
    constructor(client: Client) {
        super(client, 'noResults');
    }

    async run(message: Message, query: string) {
        message.channel.send(`❌ | No results found...`);
    }
}