const Command = require('command');

module.exports = class EvalCommand extends Command {
    constructor(client) {
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

    async run(message, args) {
        let code = message.content.replace(`${message.guild.prefix}${this.name} `, '').replace(`${message.guild.prefix}evaluate `, '');
        try {
            let ev = eval(code);

            ev = this.client.utils.cleanText(ev);
            return message.inlineReply(ev, { code: 'sh', split: true });
        } catch(err) {
            return message.inlineReply(err, { code: 'sh' });
        }
    }
}