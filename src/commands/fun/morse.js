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
        if(!args.length) {
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
            const arr = [];
            
            for(let char of text) {
                let table = Object.values(morse);
                const index = table.findIndex(x => x === char);
                if(index !== -1) { arr.push(Object.keys(morse)[index]); console.log('nice')}
            }

            message.inlineReply(arr.join(''));
        }
    }
}