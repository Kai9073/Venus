import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class SlapCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'slap',
            aliases: ['slapface', 'batslap'],
            category: 'images',
            description: 'get slapped by batman lmao',
            usage: 'slap <member> [member]',
            minArgs: 1,
            maxArgs: 2
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let user = message.mentions.members?.first(2).length === 2 ? message.mentions.members.first()?.user : message.author;
        let user2 = message.mentions.members?.first(2).length === 2 ? message.mentions.members.first(2)[1].user : message.mentions.members?.first()?.user;
        if(!user2) return message.channel.send(`❌ | Please mention another user!`);

        // @ts-ignore
        let slap = await img.slap(user.displayAvatarURL({ format: 'png', size: 512 }), user2.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(slap, 'slap.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://slap.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}