const { exec } = require("child_process");
const Command = require("../../base/classes/Command");

class ExecCommand extends Command {
    constructor() {
        super({
            name: 'exec',
            aliases: ['shell'],
            category: 'owner',
            description: 'Execute bash commands.',
            usage: 'exec <command>',
            devOnly: true,
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        exec(message.content.replace('v.shell', '').replace('v.exec', ''), (error, stdout, stderr) => {
            if (error) {
                message.inlineReply(`${error.message}`, { code: 'xl' });
                return;
            }
            if (stderr) {
                message.inlineReply(`${stderr}`, { code: 'xl' });
                return;
            }
            return message.inlineReply(`${stdout}`, { code: 'xl' });
        });
    }
}

module.exports = ExecCommand;