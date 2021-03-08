const Command = require('command');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: ['pong', 'pingpong'],
            category: 'general',
            description: 'Fetches the bot\'s latency.',
            usage: 'ping'
        });
    }

    async run(client, message, args) {
        const m = await message.channel.send('**:ping_pong: Pinging...**');
        m.edit(`**:ping_pong: Ping!**\n**Websocket Latency:** \`${client.ws.ping}ms\`\n**Message Latency:** \`${m.createdTimestamp - message.createdTimestamp}ms\``);
    }
}

