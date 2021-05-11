import Command from '../../base/Command';
import morse from '../../data/morse';
import Client from '../../base/Client';
import Discord from 'discord.js';

export default class MorseCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'morse',
            aliases: ['morsecode'],
            category: 'fun',
            description: '-.-. --- -. ...- . .-. - / .- / ... - .-. .. -. --. / - --- / -- --- .-. ... . .-.-.- (Convert a string to morse.)',
            usage: 'morse <encode|decode> <text|morse>',
            maxArgs: -1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        if(!args.length || !/^decode|encode$/.test(args[0].split("\n")[0].toLowerCase())) {
            message.reply('❌ | Use `encode`/`decode` subcommands.');
        } else if(args[0].toLowerCase() === 'encode') {
            const text = args.slice(1).join(' ').split('');
            const arr = [];
            for(let char of text) {
                // @ts-ignore
                arr.push(morse[char]);
            }

            message.reply(arr.join(' '));
        } else if(args[0].toLowerCase() === 'decode') {
            const text = args.slice(1).join(' ').split(' ');

            if(/[A-Za-z]/.test(text.join(' '))) return message.reply('❌ | Use the `encode` subcommand to encode a string to morse code.');

            const arr = [];
            
            for(let char of text) {
                let table = Object.values(morse);
                const index = table.findIndex(x => x === char);
                if(index !== -1) arr.push(Object.keys(morse)[index]);
            }

            message.reply(arr.join(''));
        }
    }
}