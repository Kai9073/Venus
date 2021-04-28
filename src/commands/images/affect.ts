import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed, User } from 'discord.js';
import Client from '../../base/Client';

export default class AffectCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'affect',
            aliases: [],
            category: 'images',
            description: 'No, it doesn\'t affect my baby',
            usage: 'affect [member]',
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        // @ts-ignore
        let user: User = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;

        let affect = await img.affect(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(affect, 'affect.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://affect.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}