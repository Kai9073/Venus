import Command from '../../base/Command';
import Discord, { MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class AvatarCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'avatar',
            aliases: ['pfp', 'profilepic', 'profilepicture'],
            category: 'general',
            description: 'Read the name of the command stupid',
            usage: 'avatar [member]'
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let user = message.mentions.users.first() || message.author;
        
        let embed = new MessageEmbed()
        .setTitle(`${user.tag}'s Avatar`)
        .setImage(user.displayAvatarURL({ size: 512, dynamic: true }))
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}