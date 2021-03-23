const Command = require("../../base/classes/Command");

class EmbedCommand extends Command {
    constructor() {
        super({
            name: 'embed',
            aliases: [],
            category: 'general',
            description: 'Send a embed using JSON Format.',
            usage: 'embed <JSON Embed>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        try {
            const embed = JSON.parse(args.join(" "));
            const { content = '' } = embed;

            message.channel.send(content, { embed: embed });
        } catch(err) {
            message.channel.send(client.sendErrorEmbed(`Invalid JSON Body: ${err.message}.`));
        }
    }
}

module.exports = EmbedCommand;