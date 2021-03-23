const Event = require('../../base/classes/Event');

class Ready extends Event {
    constructor() {
        super({
            name: 'ready'
        });
    }

    async run(client) {
        client.log('Client has logged in.', 0);
        client.user.setActivity('v.help', { type: 'LISTENING' });
    }
}

module.exports = Ready;