const Command = require('command');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'embed',
            aliases: ['em', 'jsonembed'],
            category: 'general',
            description: '{"description":"Generate your own embed by using JSON"}',
            usage: 'embed <JSON Embed>'
        });
    }

    async run(message, args) {
        try {
            const json = JSON.parse(args.join(' '));
            const { content = '' } = json;

            message.inlineReply(content, { embed: json });
        } catch(err) {
            message.inlineReply('❌ | Invalid JSON Body.');
        }
    }
}