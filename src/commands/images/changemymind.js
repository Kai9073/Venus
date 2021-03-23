const Discord = require("discord.js");
const Command = require("../../base/classes/Command");
const img = require("../../base/modules/ImageGen");

class ChangeMyMindCommand extends Command {
    constructor() {
        super({
            name: 'changemymind',
            aliases: ['cmm'],
            category: 'images',
            description: 'Generate a "Change My Mind" meme.',
            usage: 'changemymind <message>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        const attachment = new Discord.MessageAttachment(await img.changemymind(args.join(' ')), 'changemymind.png');

        let embed = new Discord.MessageEmbed()
        .setColor('#7289da')
        .attachFiles([attachment])
        .setImage('attachment://changemymind.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}

module.exports = ChangeMyMindCommand;