import { Message } from 'discord.js';
import Client from '../../base/Client';
import Event from '../../base/Event';

export default class BotDisconnectEvent extends Event {
    constructor(client: Client) {
        super(client, 'botDisconnect');
    }

    async run(message: Message) {
        message.channel.send('❌ | I have been disconnected from the voice channel!');
    }
}