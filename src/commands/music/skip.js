const Command = require('command');

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            aliases: ['next'],
            category: 'music',
            description: 'next.',
            usage: 'skip'
        });
    }

    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.inlineReply('❌ | There is no queue for this guild.');
        this.client.player.skip(message);
        message.inlineReply('⏩ | Skipped.');
    }
}