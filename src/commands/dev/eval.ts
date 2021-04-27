import Client from '../../base/Client';
import Command from '../../base/Command';
import Discord from 'discord.js';

export default class EvalCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'eval',
            aliases: ['evaluate'],
            category: 'dev',
            description: 'Evaluates provided JS Code.',
            usage: 'eval <code>',
            minArgs: 1,
            maxArgs: -1,
            devOnly: true
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let code = args.join(' ');
        try {
            let ev = eval(code);

            ev = this.client.utils.cleanText(ev);
            return message.reply(ev, { code: 'sh', split: true });
        } catch(err) {
            return message.reply(err, { code: 'sh', split: true });
        }
    }
}