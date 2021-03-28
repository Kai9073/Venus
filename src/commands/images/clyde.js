const { MessageAttachment, MessageEmbed } = require("discord.js");
const Command = require("../../base/classes/Command");
const img = require("../../base/modules/ImageGen");

class ClydeCommand extends Command {
    constructor() {
        super({
            name: 'clyde',
            aliases: [],
            category: 'images',
            description: 'Generate a Clyde message.',
            usage: 'clyde <message>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        const clyde = await img.clyde(args.join(' '));

        const attachment = new MessageAttachment(clyde, 'clyde.png');

        let embed = new MessageEmbed()
        .setColor('#7289da')
        .attachFiles([attachment])
        .setImage('attachment://clyde.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}

module.exports = ClydeCommand;