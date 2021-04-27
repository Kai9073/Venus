import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class OwofyCommand extends Command {
    constructor(client: Client) {
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

    async run(message: Discord.Message, args: string[]) {
        message.reply(args.join(' ').replace(/[lr]/g, "w").replace(/(?<=[aeiou])th/g, "ff").replace(/!/g, " òwó!").replace(/~/g, " uwu~"));
    }
}