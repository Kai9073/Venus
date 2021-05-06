import Client from '../../base/Client';
import Event from '../../base/Event';

export default class ReadyEvent extends Event {
    constructor(client: Client) {
        super(client, 'ready');
    }

    async run() {
        this.client.log(`Client has logged in!`, 0);
    }
}