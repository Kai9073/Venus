import Client from "../../base/Client";
import Command from '../../base/Command';
import Discord from 'discord.js';

export default class ReverseCommand extends Command {
    constructor(client: Client) {
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

    async run(message: Discord.Message, args: string[]) {
        message.reply(args.join(' ').split('').reverse().join(''));
    }
}