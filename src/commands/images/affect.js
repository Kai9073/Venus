const Command = require("../../base/classes/Command");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const img = require("../../base/modules/ImageGen");

class AffectCommand extends Command {
    constructor() {
        super({
            name: 'affect',
            aliases: [],
            category: 'images',
            description: 'Generate a affect meme.',
            usage: 'affect [member]'
        });
    }

    async run(client, message, args) {
        let user = message.mentions.members?.first() ? message.mentions.members.first()?.user : args.length ? client.resolveUser(args.join(' ')) : message.author;
        const attachment = new MessageAttachment(await img.affect(user?.displayAvatarURL({ format: 'png', size: 512 })), 'affect.png');
    
        let embed = new MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://affect.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}

module.exports = AffectCommand;