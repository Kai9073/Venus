const Command = require('command');
const Discord = require("discord.js");
const canvacord = require('canvacord');

module.exports = class ChangeMyMindCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'changemymind',
            aliases: ['cmm'],
            category: 'images',
            description: 'Generate a "Change My Mind" meme.',
            usage: 'changemymind <message>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        const changemymind = await canvacord.Canvas.changemymind(args.join(' '));

        const attachment = new Discord.MessageAttachment(changemymind, 'changemymind.png');

        let embed = new Discord.MessageEmbed()
        .setColor('#7289da')
        .attachFiles([attachment])
        .setImage('attachment://changemymind.png');
        message.channel.send(embed);
    }
}