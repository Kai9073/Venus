const Command = require('command');

module.exports = class TCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'base64',
            aliases: ['b64'],
            category: 'fun',
            description: 'RW5jb2RlIG9yIGRlY29kZSBiYXNlNjQgc3RyaW5ncy4=',
            usage: 'base64 <encode|decode> <text|base64>',
            maxArgs: -1
        });
    }

    async run(message, args) {
        if(!args.length || !/^decode|encode$/.test(args[0].split("\n")[0].toLowerCase())) {
            message.inlineReply('❌ | Use `encode`/`decode` subcommands.');
        } else if(args[0].toLowerCase() === 'encode') {
            message.inlineReply(Buffer.from(args.slice(1).join(' ')).toString('base64'));
        } else if(args[0].toLowerCase() === 'decode') {
            message.inlineReply(Buffer.from(args.slice(1).join(' '), 'base64').toString('ascii'));
        }
    }
}