import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class TriggeredCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'triggered',
            aliases: ['trigger'],
            category: 'images',
            description: 'Apply triggered effect on your pfp',
            usage: 'triggered [member]',
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        // @ts-ignore
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;

        let trigger = await img.trigger(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(trigger, 'trigger.gif');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://trigger.gif')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}