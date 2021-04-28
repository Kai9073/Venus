import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class PresentationCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'presentation',
            aliases: ['lisapresentation', 'present', 'lisa'],
            category: 'images',
            description: 'oh he speaking fax',
            usage: 'presentation <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let presentation = await img.presentation(args.join(' '));
        let attachment = new MessageAttachment(presentation, 'presentation.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://presentation.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}