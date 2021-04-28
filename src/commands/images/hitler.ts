import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class HitlerCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'hitler',
            aliases: ['adolf', 'adolfthitler'],
            category: 'images',
            description: 'Worse than hitler',
            usage: 'hitler [member]',
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        // @ts-ignore
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;

        let hitler = await img.hitler(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(hitler, 'hitler.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://hitler.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}