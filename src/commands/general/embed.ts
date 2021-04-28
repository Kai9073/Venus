import Discord from 'discord.js';
import Client from '../../base/Client';
import Command from '../../base/Command';

export default class EmbedCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'embed',
            aliases: ['em', 'jsonembed'],
            category: 'general',
            description: '{"description":"Generate your own embed by using JSON"}',
            usage: 'embed <JSON Embed>'
        });
    }

    async run(message: Discord.Message, args: string[]) {
        try {
            const json = JSON.parse(args.join(' '));
            const { content = '' } = json;

            message.reply(content, { embed: json });
        } catch(err) {
            message.reply('❌ | Invalid JSON body.');
        }
    }
}