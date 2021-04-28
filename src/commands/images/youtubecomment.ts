import Command from '../../base/Command'; 
import img from '../../modules/ImageGen';
import Discord, { MessageAttachment, MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class YoutubeCommentCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'youtubecomment',
            aliases: ['comment', 'ytcomment'],
            category: 'images',
            description: 'Create a youtube comment',
            usage: 'youtubecomment [member] <text>',
            minArgs: 2,
            maxArgs: -1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        // @ts-ignore
        let user = message.mentions.users.first() || await message.resolveUser(args.join(' ')) || message.author;

        let text = message.mentions.users.first() ? args.slice(1).join(' ') : args.join(' ');
        let youtube = await img.youtube(user.displayAvatarURL({ format: 'png', size: 512 }), user.username, text);
        let attachment = new MessageAttachment(youtube, 'youtube.png');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://youtube.png')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}