const Command = require('../../base/classes/Command');
const img = require('../../base/modules/ImageGen');
const { MessageEmbed, MessageAttachment } = require('discord.js'); 

class PresentationCommand extends Command {
    constructor() {
        super({
            name: 'presentation',
            aliases: ['lisapresentation', 'lisapresent', 'present'],
            category: 'images',
            description: 'Show facts to people using the lisa presentation template',
            usage: 'presentation <text>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        const attachment = new MessageAttachment(await img.presentation(args.join(' ')), 'presentation.png');
    
        let embed = new MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://presentation.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}

module.exports = PresentationCommand;