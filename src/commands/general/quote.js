const Command = require('command');
const { MessageEmbed } = require('discord.js');
const quotes = require('../../base/data/quotes.json');

module.exports = class QuoteCommand extends Command {
    constructor(client) {
        super(client, {
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
        message.channel.send(embed);
    }
}