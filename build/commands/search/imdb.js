"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const discord_js_1 = require("discord.js");
const imdb_api_1 = __importDefault(require("imdb-api"));
const client = new imdb_api_1.Client({ apiKey: process.env.IMDB_API });
class IMDBCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'imdb',
            aliases: ['movieinfo', 'showinfo'],
            category: 'search',
            description: 'Get information about the specified show, movie, or series.',
            usage: 'imdb <(movie|show|series) title | imdb id>',
            minArgs: 1,
            maxArgs: -1
        });
    }
    async run(message, args) {
        try {
            const data = /ev\d{7}\/\d{4}(-\d)?|(ch|co|ev|nm|tt)\d{7}/.test(args[0]) === true ? await client.get({ id: args[0] }) : await client.get({ name: args.join(' ') });
            let embed = new discord_js_1.MessageEmbed()
                .setTitle(data.year === 0 ? `${data.title}` : `${data.title} (${data.year})`)
                .setURL(data.imdburl)
                .setDescription(data.plot)
                .addField('Production', data.production || 'None', true)
                .addField('Director', data.director || 'None', true)
                .addField('Writers', data.writer || 'None', true)
                .addField('Runtime', data.runtime || 'None', true)
                .addField('Type', this.client.utils.toProperCase(data.type) || 'None', true)
                .addField('Runtime', data.runtime || 'None', true)
                .addField('Status', !data.end_year ? 'Ongoing' : 'Finished', true)
                .addField('Actors', data.actors || 'None', true)
                .addField('Rated', data.rated || 'None', true)
                .addField('Languages', data.languages || 'None', true)
                .addField('Awards', data.awards || 'None', true)
                .addField('Rating', data.rating, true)
                .addField('Metascore', data.metascore, true)
                .addField('Votes', data.votes, true)
                .setColor('RANDOM')
                .setThumbnail(data.poster.startsWith('https') ? data.poster : data.poster.startsWith('http') ? data.poster : null)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
            message.reply(embed);
        }
        catch (err) {
            message.reply('❌ | No data retrieved from IMDB.');
        }
    }
}
exports.default = IMDBCommand;
