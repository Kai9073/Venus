const Command = require('command');

module.exports = class OwofyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'owofy',
            aliases: ['owo'],
            category: 'fun',
            description: 'Make yow message into owo',
            usage: 'owofy <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message, args) {
        message.inlineReply(args.join(' ').replace(/[rlu]/, 'w'));
    }
}