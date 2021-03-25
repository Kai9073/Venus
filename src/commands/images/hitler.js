const { MessageEmbed, MessageAttachment } = require("discord.js");
const img = require("../../base/modules/ImageGen");
const Command = require("../../base/classes/Command");

class HitlerCommand extends Command {
    constructor() {
        super({
            name: 'hitler',
            aliases: [],
            category: 'images',
            description: 'Generate a "Hitler" meme.',
            usage: 'hitler [member]'
        });
    }

    async run(client, message, args) {
        let user = message.mentions.members?.first() ? message.mentions.members.first()?.user : args.length ? client.resolveUser(args.join(' ')) : message.author;
        
        const attachment = new MessageAttachment(await img.hitler(user?.displayAvatarURL({ format: 'png', size: 512 })), 'hitler.png');
    
        let embed = new MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://hitler.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}

module.exports = HitlerCommand;
