const Command = require('command');
const { split } = require('ffmpeg-static');

module.exports = class ExecCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            aliases: ['code'],
            category: 'owner',
            description: 'Executes code provided.',
            usage: 'eval <code>',
            devOnly: true,
            minimumRequiredArgs: 1
        });

        this.client = client;
    }

    async run(client, message, args) {
        try {
            let ev = eval(message.content.replace('v.eval', '').replace('v.code', ''));

            ev = this.cleanText(ev);
            return message.channel.send(ev, { code: "xl", split: true });
        } catch(err) {
            return message.channel.send(err, { code: "xl", split: true });
        }
    }

    cleanText(text) {
        if (typeof text !== "string") text = require("util").inspect(text, { depth: 1 });
        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(new RegExp(this.client.token, "g"), "XXXXXXXXXXXXXXXXX.XXXXX.XXXXXXXXXXX");
        return text;
    }
}