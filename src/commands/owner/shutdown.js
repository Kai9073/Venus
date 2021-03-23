const Command = require("../../base/classes/Command");

class ShutdownCommand extends Command {
    constructor() {
        super({
            name: 'shutdown',
            aliases: ['off'],
            category: 'owner',
            description: 'Shutdown the whole bot or terminate the bot\'s process.',
            usage: 'shutdown',
            devOnly: true
        })
    }

    async run(client, message, args) {
        message.channel.send(`Goodbye :wave:`);
        client.log('Shutting down...');
        setTimeout(() => {
            // eslint-disable-next-line no-undef
            process.exit();
        }, 5000);
    }
}

module.exports = ShutdownCommand;