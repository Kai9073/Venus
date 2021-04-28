import Command from '../../base/Command';
import ms from 'ms';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class UptimeCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'uptime',
            aliases: ['onlinetime'],
            category: 'general',
            description: 'check out the uptime of the bot',
            usage: 'uptime'
        });
    }

    async run(message: Discord.Message, args: string[]) {
        // @ts-ignore
        message.reply(`Bot has been online for **${ms(this.client.uptime, { compact: true })}**.`);
    }
}