const Discord = require("discord.js");
const Command = require("../../base/classes/Command");
const img = require("../../base/modules/ImageGen");

class TriggeredCommand extends Command {
    constructor() {    
        super({
            name: 'triggered',
            aliases: [],
            category: 'images',
            description: 'Generate a "triggered" meme with someones profile picture.',
            usage: 'triggered [member]'
        });
    }

    async run(client, message, args) {
        let user = message.mentions.members?.first() ? message.mentions.members.first()?.user : message.author;

        const triggered = await img.trigger(user?.displayAvatarURL({ format: 'png', size: 512 }));

        const attachment = new Discord.MessageAttachment(triggered, 'triggered.gif');

        let embed = new Discord.MessageEmbed()
        .setColor('#7289da')
        .attachFiles([attachment])
        .setImage('attachment://triggered.gif')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}

module.exports = TriggeredCommand;