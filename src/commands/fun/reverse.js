const fetch = require('node-fetch');
const Command = require('command');

module.exports = class ReverseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reverse',
            aliases: [],
            category: 'general',
            description: 'Reverse text.',
            usage: 'reverse <text>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        message.channel.send(client.utils.reverse(args.join(" ")));
    }
}