const Command = require('command');
const canvacord = require('canvacord');
const Discord = require("discord.js");

class ClydeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clyde',
            aliases: [],
            category: 'images',
            description: 'Generate a Clyde message.',
            usage: 'clyde <message>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        const clyde = await canvacord.Canvas.clyde(args.join(' '));

        const attachment = new Discord.MessageAttachment(clyde, 'clyde.png');

        let embed = new Discord.MessageEmbed()
        .setColor('#7289da')
        .attachFiles([attachment])
        .setImage('attachment://clyde.png');
        message.channel.send(embed);
    }
}

module.exports = ClydeCommand;