const Command = require('command');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: ['pong', 'pingpong', 'pongping'],
            category: 'general',
            description: 'Ping pong 🏓',
            usage: 'ping'
        });
    }

    async run(message, args) {
        const msg = await message.inlineReply('🏓 Pinging...');
        msg.edit(`🏓 Pong!\nWS Ping: \`${this.client.ws.ping}ms\`\nMessage Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\``);
    }
}  