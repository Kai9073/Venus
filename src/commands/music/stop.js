const Command = require('command');

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            aliases: ['dc', 'leave', 'getout', 'fuckoff', 'shutup', 'sadap', 'stfu', 'gtfo'],
            category: 'music',
            description: 'Stop the music playing and leave vc',
            usage: 'stop'
        });
    }

    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.inlineReply('❌ | There is no queue for this guild.');
        this.client.player.stop(message);
        message.inlineReply('⏹ | Stopped.')
    }
}