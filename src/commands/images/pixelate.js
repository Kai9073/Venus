const Command = require('../../base/classes/Command');
const Discord = require('discord.js');
const img = require('../../base/modules/ImageGen');

class PixelateCommand extends Command {
    constructor() {
        super({
            name: 'pixelate',
            aliases: ['pixel', 'japan'],
            category: 'images',
            description: 'Pixelate your profile picture.',
            usage: 'pixelate [member]'
        });
    }

    async run(client, message, args) {
        let user = message.mentions.members?.first() ? message.mentions.members.first()?.user : args.length ? client.resolveUser(args.join(' ')) : message.author;
        if(!user) return message.inlineReply(client.sendErrorEmbed(`User doesn't exist.`));

        const attachment = new Discord.MessageAttachment(await img.pixelate(user?.displayAvatarURL({ format: 'png', size: 512 })), 'pixelate.png');

        let embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://pixelate.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}

module.exports = PixelateCommand;