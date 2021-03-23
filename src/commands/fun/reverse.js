const Command = require("../../base/classes/Command");

class ReverseCommand extends Command {
    constructor() {
        super({
            name: 'reverse',
            aliases: [],
            category: 'fun',
            description: 'Reverse text.',
            usage: 'reverse <text>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        message.channel.send(client.utils.reverse(args.join(' ')));
    }
}

module.exports = ReverseCommand;