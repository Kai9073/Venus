import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class ChangeMyMindCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'changemymind',
            aliases: ['cmm'],
            category: 'images',
            description: 'Venus is great, change my mind',
            usage: 'changemymind <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let changemymind = await img.changemymind(args.join(' '));
        let attachment = new MessageAttachment(changemymind, 'changemymind.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://changemymind.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}