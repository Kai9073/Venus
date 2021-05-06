import { Message } from 'discord.js';
import Client from '../../base/Client';
import Event from '../../base/Event';

export default class PlaylistParseStartEvent extends Event {
    constructor(client: Client) {
        super(client, 'playlistParseStart');
    }

    async run(playlist: Object, message: Message) {
        message.channel.send('<a:loading:803081781707407361> | Parsing playlist... This may take a few a few minutes or seconds...');
    }
}