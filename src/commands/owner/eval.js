const Command = require("../../base/classes/Command");

class  EvalCommand extends Command {
    constructor() {
        super({
            name: 'eval',
            aliases: ['code'],
            category: 'owner',
            description: 'Executes code provided.',
            usage: 'eval <code>',
            devOnly: true,
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        try {
            let ev = eval(message.content.replace('v.eval', '').replace('v.code', ''));

            ev = client.utils.cleanText(ev, client);
            return message.inlineReply(ev, { code: "xl", split: true });
        } catch(err) {
            return message.inlineReply(err, { code: "xl", split: true });
        }
    }
}

module.exports = EvalCommand;