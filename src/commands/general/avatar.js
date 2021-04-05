const Command = require('command');
const { MessageEmbed } = require('discord.js');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['pfp', 'profilepic', 'profilepicture'],
            category: 'general',
            description: 'Read the name of the command stupid',
            usage: 'avatar [member]'
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() ? message.mentions.users.first().user : args.length ? await message.resolveUser(args.join(' ')) : message.author;
        
        let embed = new MessageEmbed()
        .setTitle(`${user.tag}'s Avatar`)
        .setImage(user.displayAvatarURL({ size: 512, dynamic: true }))
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}