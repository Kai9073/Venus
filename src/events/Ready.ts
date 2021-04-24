const Event = require('event');

module.exports = class Ready extends Event {
    constructor(client) {
        super(client, 'ready');
    }

    async run() {
        this.client.log(`Client has logged in!`, 0);
    }
}