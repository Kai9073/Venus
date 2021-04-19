const Command = require('command');
const ms = require('pretty-ms');

module.exports = class UptimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'uptime',
            aliases: ['onlinetime'],
            category: 'general',
            description: 'check out the uptime of the bot',
            usage: 'uptime'
        });
    }

    async run(message, args) {
        message.inlineReply(`Bot has been online for **${ms(this.client.uptime, { compact: true })}**.`);
    }
}