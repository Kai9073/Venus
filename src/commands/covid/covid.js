const covid = require('novelcovid');
const Command = require('command');
const { MessageEmbed } = require('discord.js');

module.exports = class CovidCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'covid',
            aliases: ['cov', 'corona', 'coronavirus'],
            category: 'covid',
            description: 'Returns coronavirus statistics.',
            usage: 'covid [country]'
        });
    }

    async run(client, message, args) {
        if(!args.length) {
            let data = await covid.all();
            let embed = new MessageEmbed()
            .setTitle('Covid-19 World Statistics')
            .addField('Cases', `${data.cases.toLocaleString()}\n+${data.todayCases.toLocaleString()}`, true)
            .addField('Active Cases', `${data.active.toLocaleString()}`, true)
            .addField('Recoveries', `${data.recovered.toLocaleString()}\n+${data.todayRecovered.toLocaleString()}`, true)
            .addField('Death', `${data.deaths.toLocaleString()}\n+${data.todayDeaths.toLocaleString()}`, true)
            .setColor('RANDOM')
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(embed);
        } else {
            let data = await covid.countries({ country: args.join(' ') });

            if(!data.cases) return message.channel.send(client.sendErrorEmbed(`That country doesn't seem to exist.`));

            let yesterday = await covid.yesterday.countries({ country: args.join(' ') });
            
            data.todayActive = data.active - yesterday.active;
            data.todayCritical = data.critical - yesterday.critical;
            data.todayTests = data.tests - yesterday.tests;

            let embed = new MessageEmbed()
            .setTitle('Covid-19 ' + data.country + ' Statistics')
            .addField('Cases', `${data.cases.toLocaleString()}\n(+${data.todayCases.toLocaleString()})`, true)
            .addField('Active Cases', `${data.active.toLocaleString()}\n(${data.todayActive >= 0 ? '+' : '-'}${data.todayActive.toLocaleString()})`, true)
            .addField('Recoveries', `${data.recovered.toLocaleString()}\n(+${data.todayRecovered.toLocaleString()})`, true)
            .addField('Death', `${data.deaths.toLocaleString()}\n(+${data.todayDeaths.toLocaleString()})`, true)
            .addField('Critical', `${data.critical.toLocaleString()}\n(${data.todayCritical >= 0 ? '+' : '-'}${data.todayCritical.toLocaleString()})`, true)
            .addField('Tests', `${data.tests.toLocaleString()}\n(${data.todayTests >= 0 ? '+' : '-'}${data.todayTests.toLocaleString()})`, true)
            .setColor('RANDOM')
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(embed);
        }
    }
}