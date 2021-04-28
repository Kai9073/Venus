import Discord from 'discord.js';
import Client from '../../base/Client';
import Command from '../../base/Command';

export default class PingCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'ping',
            aliases: ['pong', 'pingpong', 'pongping'],
            category: 'general',
            description: 'Ping pong 🏓',
            usage: 'ping'
        });
    }

    async run(message: Discord.Message, args: string[]) {
        const msg = await message.reply('🏓 Pinging...');
        msg.edit(`🏓 Pong!\nWS Ping: \`${this.client.ws.ping}ms\`\nMessage Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\``);
    }
}  