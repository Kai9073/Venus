const Command = require('command');
const { MessageEmbed } = require('discord.js');
const imdb = require('imdb-api');
const client = new imdb.Client({ apiKey: process.env.IMDB_API });

module.exports = class IMDBCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'imdb',
            aliases: ['movieinfo', 'showinfo'],
            category: 'general',
            description: 'Get information about the specified show, movie, or series.',
            usage: 'imdb <(movie|show|series) title | imdb id>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message, args) {
        const data = /ev\d{7}\/\d{4}(-\d)?|(ch|co|ev|nm|tt)\d{7}/.test(args[0]) === true ? await client.get({ id: args[0] }) : await client.get({ name: args.join(' ') });

        let embed = new MessageEmbed()
        .setTitle(data.year === 0 ? `${data.title}`: `${data.title} (${data.year})`)
        .setURL(data.imdburl)
        .setDescription(data.plot)
        .addField('Production', data.production ?? 'None', true)
        .addField('Director', data.director, true)
        .addField('Writers', data.writer, true)
        .addField('Runtime', data.runtime, true)
        .addField('Type', this.client.utils.toProperCase(data.type), true)
        .addField('Runtime', data.runtime, true)
        .addField('Status', !data.end_year ? 'Ongoing' : 'Finished', true)
        .addField('Actors', data.actors, true)
        .addField('Rated', data.rated, true)
        .addField('Languages', data.languages, true)
        .addField('Awards', data.awards, true)
        .addField('Rating', data.rating, true)
        .addField('Metascore', data.metascore, true)
        .addField('Votes', data.votes, true)
        .setColor('RANDOM')
        .setThumbnail(data.poster)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}