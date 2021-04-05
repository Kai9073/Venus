const Command = require('command');

module.exports = class ReverseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reverse',
            aliases: [],
            category: 'fun',
            description: '.dedivorp txet eht esreveR',
            usage: 'reverse <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message, args) {
        message.inlineReply(args.join(' ').split('').reverse().join(''));
    }
}