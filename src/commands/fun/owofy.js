const Command = require('command');

class OwofyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'owofy',
            aliases: ['owo'],
            category: 'fun',
            description: 'Owofies a message.',
            usage: 'owofy <message>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        message.channel.send(args.join(' ').replace(/rr|uu|ll/g,"ww").replace(/(?<=a|e|i|o|u)[rlu]|[ru](?=a|e|i|o|u)/g,"w"));
    }
}

module.exports = OwofyCommand;