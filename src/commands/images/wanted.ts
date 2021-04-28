import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class WantedCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'wanted',
            aliases: [],
            category: 'images',
            description: 'you are wanted',
            usage: 'wanted [member]',
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        // @ts-ignore
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;

        let wanted = await img.wanted(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(wanted, 'wanted.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://wanted.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}