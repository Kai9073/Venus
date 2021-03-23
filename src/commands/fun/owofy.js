const Command = require('../../base/classes/Command');

class OwofyCommand extends Command {
    constructor() {
        super({
            name: 'owofy',
            aliases: ['owo'],
            category: 'fun',
            description: 'Owofies a message.',
            usage: 'owofy <message>',
            minimumRequiredArgs: 1
        });
    }

    run(client, message, args) {
        message.channel.send(args.join(' ').replace(/rr|uu|ll/g,"ww").replace(/(?<=a|e|i|o|u)[rlu]|[ru](?=a|e|i|o|u)/g,"w"));
    }
}

module.exports = OwofyCommand;