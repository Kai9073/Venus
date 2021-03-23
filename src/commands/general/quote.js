const { MessageEmbed } = require("discord.js");
const Command = require("../../base/classes/Command");
const quotes = require("../../base/data/quotes.json");

class QuoteCommand extends Command {
    constructor() {
        super({
            name: 'quote',
            aliases: [],
            category: 'general',
            description: 'Random quote for you.',
            usage: 'quote'
        });
    }

    run(client, message, args) {
        let quote = quotes[Math.floor(Math.random() * quotes.length)]
        let embed = new MessageEmbed()
        .setAuthor(quote.author)
        .setDescription(quote.quote)
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}

module.exports = QuoteCommand;