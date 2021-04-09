const Command = require('command');
const morse = require('@assets/data/morse');

module.exports = class MorseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'morse',
            aliases: ['morsecode'],
            category: 'fun',
            description: '-.-. --- -. ...- . .-. - / .- / ... - .-. .. -. --. / - --- / -- --- .-. ... . .-.-.- (Convert a string to morse.)',
            usage: 'morse <encode|decode> <text|morse>',
            maxArgs: -1
        });
    }

    async run(message, args) {
        if(!args.length || !/^decode|encode$/.test(args[0].split("\n")[0].toLowerCase())) {
            message.inlineReply('❌ | Use `encode`/`decode` subcommands.');
        } else if(args[0].toLowerCase() === 'encode') {
            const text = args.slice(1).join(' ').split('');
            const arr = [];
            for(let char of text) {
                arr.push(morse[char]);
            }

            message.inlineReply(arr.join(' '));
        } else if(args[0].toLowerCase() === 'decode') {
            const text = args.slice(1).join(' ').split(' ');

            if(/[A-Za-z]/.test(text.join(' '))) return message.inlineReply('❌ | Use the `encode` subcommand to encode a string to morse code.');

            const arr = [];
            
            for(let char of text) {
                let table = Object.values(morse);
                const index = table.findIndex(x => x === char);
                if(index !== -1) arr.push(Object.keys(morse)[index]);
            }

            message.inlineReply(arr.join(''));
        }
    }
}