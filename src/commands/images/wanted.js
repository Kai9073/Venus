const { MessageAttachment, MessageEmbed } = require("discord.js");
const Command = require("../../base/classes/Command");
const img = require("../../base/modules/ImageGen");

class WantedCommand extends Command {
    constructor() {
        super({
            name: 'wanted',
            aliases: [],
            category: 'images',
            description: 'Generate a wanted image with your friend\'s profile picture, maybe.',
            usage: 'wanted [member]'
        });
    }

    async run(client, message, args) {
        let user = message.mentions.members?.first() ? message.mentions.members.first()?.user : args.length ? client.resolveUser(args.join(' ')) : message.author;

        const attachment = new MessageAttachment(await img.wanted(user?.displayAvatarURL({ format: 'png', size: 512 })), 'wanted.png');
    
        let embed = new MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://wanted.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}

module.exports = WantedCommand;