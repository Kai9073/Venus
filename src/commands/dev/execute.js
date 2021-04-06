const Command = require('command');
const process = require('child_process');

module.exports = class ExecuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'execute',
            aliases: ['exec', 'shell'],
            category: 'dev',
            description: 'Execute a shell command.',
            usage: 'execute <command>',
            minArgs: 1,
            maxArgs: -1,
            devOnly: true
        });
    }

    async run(message, args) {
        const command = message.content.replace(`${message.guild.prefix}execute`, ``).replace(`${message.guild.prefix}exec`, ``).replace(`${message.guild.prefix}shell`, ``)
        process.exec(command, (error, stdout, stderr) => {
            if (error) {
                return message.inlineReply(error.message, { code: 'xl' });
            }
            if (stderr) {
                return message.inlineReply(stderr, { code: 'xl' });
            }
            return message.inlineReply(stdout, { code: 'xl' });
        });
    }
}