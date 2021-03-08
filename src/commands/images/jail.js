const { round } = require('canvacord/src/Plugins');
const Command = require('command');
const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = class JailCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'jail',
            aliases: ['prison'],
            category: 'images',
            description: 'Generate a "jail" meme.',
            usage: 'jail [member]'
        });
    }

    async run(client, message, args) {
        const user = message.mentions.members.first().user.displayAvatarURL({ format: 'png' }) || message.author.displayAvatarURL({ format: 'png' });
        const jail = await canvacord.Canvas.jail(user, true);

        const attachment = new Discord.MessageAttachment(jail, 'jail.png');

        let embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://jail.png');
        message.channel.send(embed);
    }
}