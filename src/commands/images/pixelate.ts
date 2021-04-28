import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class PixelateCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'pixelate',
            aliases: ['pixel'],
            category: 'images',
            description: 'oh who is that',
            usage: 'pixelate [member]',
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        // @ts-ignore
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;

        let pixelate = await img.pixelate(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(pixelate, 'pixelate.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://pixelate.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}