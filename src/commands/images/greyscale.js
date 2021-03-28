const Command = require('../../base/classes/Command');
const img = require('../../base/modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

class GrayscaleCommand extends Command {
    constructor() {
        super({
            name: 'grayscale',
            aliases: ['grey', 'gray', 'greyscale'],
            category: 'images',
            description: 'Grayscale your avatar ig?',
            usage: 'grayscale [member]'
        });
    }

    async run(client, message, args) {
        let user = message.mentions.members.first() ? message.mentions.members.first().user : args.length ? client.resolveUser(args.join(' ')) : message.author;
        if(!user) return message.inlineReply(client.sendErrorEmbed(`User doesn't exist.`));
        
        const attachment = new MessageAttachment(await img.greyscale(user.displayAvatarURL({ format: 'png', size: 512 })), 'grayscale.png');
    
        let embed = new MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://grayscale.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}

module.exports = GrayscaleCommand;