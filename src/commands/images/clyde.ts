import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class ClydeCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'clyde',
            aliases: ['discordclyde'],
            category: 'images',
            description: 'you dont have nitro so dont use emojis',
            usage: 'clyde <text>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let clyde = await img.clyde(args.join(' '));
        let attachment = new MessageAttachment(clyde, 'clyde.png')

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://clyde.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}