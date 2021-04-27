import Command from '../../base/Command';
import process from 'child_process';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class ExecuteCommand extends Command {
    constructor(client: Client) {
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

    async run(message: Discord.Message, args: string[]) {
        try {
            const command = args.join(' ');
            process.exec(command, (error, stdout, stderr) => {
                if (error) {
                    return message.reply(error.message, { code: 'xl', split: true });
                }
                if (stderr) {
                    return message.reply(stderr, { code: 'xl', split: true });
                }
                return message.reply(stdout, { code: 'xl', split: true });
            });
        } catch(err) {
            message.reply('❌ | An error occurred...');
        }
    }
}