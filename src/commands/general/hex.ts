import Command from '../../base/Command';
import Discord, { MessageEmbed, MessageAttachment } from 'discord.js';
import img from '../../modules/ImageGen';
import Client from '../../base/Client';

export default class TCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'hex',
            aliases: ['hexcode', 'hexcolor'],
            category: 'general',
            description: 'Hex color',
            usage: 'hex <hex number>',
            minArgs: 1,
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        if(!/^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$/i.test(args[0])) return message.reply('❌ | Provide a valid hex color!');

        let hex = await img.hex(args[0]);
        let attachment = new MessageAttachment(hex, 'hex.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://hex.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}