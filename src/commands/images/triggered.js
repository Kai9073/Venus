const Command = require('command');
const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = class TriggeredCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'triggered',
            aliases: [],
            category: 'images',
            description: 'Generate a "triggered" meme with someones profile picture.',
            usage: 'triggered [member]'
        });
    }

    async run(client, message, args) {
        const user = message.mentions.members.first().user.displayAvatarURL({ format: 'png' }) || message.author.displayAvatarURL({ format: 'png' });
        const triggered = await canvacord.Canvas.trigger(user);

        const attachment = new Discord.MessageAttachment(triggered, 'triggered.gif');

        let embed = new Discord.MessageEmbed()
        .setColor('#7289da')
        .attachFiles([attachment])
        .setImage('attachment://triggered.gif');
        message.channel.send(embed);
    }
}