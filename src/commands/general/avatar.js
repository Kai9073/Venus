const { MessageEmbed } = require("discord.js");
const Command = require("../../base/classes/Command");

class AvatarCommand extends Command {
    constructor() {
        super({
            name: 'avatar',
            aliases: ['av', 'pfp', 'profilepic'],
            category: 'general',
            description: 'Returns the user\'s avatar.',
            usage: 'avatar [member]'
        });
    }

    async run(client, message, args) {
        let user = message.guild?.members.cache.get(args[0]) ? message.guild.members.cache.get(args[0])?.user : message.mentions?.members?.first() ? message.mentions.members.first()?.user : message.author;

        if(!user) return message.channel.send(client.sendErrorEmbed(`That user doesn't seem to exist in this guild.`));

        let embed = new MessageEmbed()
        .setTitle(`${user.tag}'s Avatar`)
        .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 512 }))
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}

module.exports = AvatarCommand;