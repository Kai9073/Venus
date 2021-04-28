import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class GrayscaleCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'grayscale',
            aliases: ['greyscale', 'gray', 'grey'],
            category: 'images',
            description: 'greyscale your or someones pfp',
            usage: 'grayscale',
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        // @ts-ignore
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;

        let grayscale = await img.greyscale(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(grayscale, 'grayscale.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://grayscale.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}