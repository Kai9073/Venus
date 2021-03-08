const Command = require('command');
const { MessageEmbed } = require('discord.js');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['av', 'pfp', 'profilepic'],
            category: 'general',
            description: 'Returns the user\'s avatar.',
            usage: 'avatar [member]'
        });
    }

    async run(client, message, args) {
        let user = message.author || message.guild.members.cache.get(args[0]).user || message.mentions.members.first();

        if(!user) return message.channel.send(client.sendErrorEmbed(`That user doesn't seem to exist in this guild.`));

        let embed = new MessageEmbed()
        .setAuthor(`${user.tag}'s Avatar`, user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setImage(user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setColor('RANDOM');
        message.channel.send(embed);
    }
}