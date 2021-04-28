import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class WastedCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'wasted',
            aliases: ['dead'],
            category: 'images',
            description: 'lets add the wasted overlay on your pfp',
            usage: 'wasted [member]',
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        // @ts-ignore
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;

        let wasted = await img.wasted(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(wasted, 'wasted.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://wasted.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}