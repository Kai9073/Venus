const Command = require('command');
const { MessageEmbed } = require('discord.js');
const covid = require('novelcovid');

module.exports = class CovidCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'covid',
            aliases: ['covid19', 'corona', 'coronavirus', 'cov'],
            category: 'covid',
            description: 'Get statistics about this stupid virus lmao',
            usage: 'covid [country]'
        });
    }

    async run(message, args) {
        if(!args.length) {
            const data = await covid.all();
            const yesterdayData = await covid.yesterday.all();

            data.todayActive = data.active - yesterdayData.active;
            data.todayCritical = data.critical - yesterdayData.critical; 
            data.todayTests = data.tests -  yesterdayData.tests;

            let embed = new MessageEmbed()
            .setTitle('COVID-19 Global Statistics')
            .setDescription('Data provided by Worldometers.')
            .setThumbnail('https://images-ext-1.discordapp.net/external/l_sfF6n50PGj5oKATrkLYY0RNOkO0fAiDu-_HF2rwmc/https/i2x.ai/wp-content/uploads/2018/01/flag-global.jpg')
            .addField('Total Cases', `${data.cases.toLocaleString()}\n(+${data.todayCases.toLocaleString()})`, true)
            .addField('Active Cases', `${data.active.toLocaleString()}\n(${data.todayActive >= 0 ? '+' : '-'}${data.todayActive.toLocaleString()})`, true)
            .addField('Deaths', `${data.deaths.toLocaleString()}\n(+${data.todayDeaths.toLocaleString()})`, true)
            .addField('Recovered', `${data.recovered.toLocaleString()}\n(+${data.todayRecovered.toLocaleString()})`, true)
            .addField('Critical', `${data.critical.toLocaleString()}\n(${data.todayCritical >= 0 ? '+' : '-'}${data.todayCritical.toLocaleString()})`, true)
            .addField('Tests', `${data.tests.toLocaleString()}\n(${data.todayTests >= 0 ? '+' : '-'}${data.todayTests.toLocaleString()})`, true)
            .setColor(data.recovered > data.deaths ? 'GREEN' : data.deaths > data.recovered ? '#FFFF00' : 'GREEN')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            return message.inlineReply(embed);
        } else {
            const data = await covid.countries({ country: args.join(' ') });
            const yesterdayData = await covid.yesterday.countries({ country: args.join(' ') });

            if(!data.cases || !yesterdayData.cases) return message.channel.send(`❌ | That country doesn't seem to exist.`);

            data.todayActive = data.active - yesterdayData.active;
            data.todayCritical = data.critical - yesterdayData.critical; 
            data.todayTests = data.tests -  yesterdayData.tests;

            let embed = new MessageEmbed()
            .setTitle(`COVID-19 ${data.country} Statistics`)
            .setDescription('Data provided by Worldometers.')
            .setThumbnail(data.countryInfo.flag)
            .addField('Total Cases', `${data.cases.toLocaleString()}\n(+${data.todayCases.toLocaleString()})`, true)
            .addField('Active Cases', `${data.active.toLocaleString()}\n(${data.todayActive >= 0 ? '+' : '-'}${data.todayActive.toLocaleString()})`, true)
            .addField('Deaths', `${data.deaths.toLocaleString()}\n(+${data.todayDeaths.toLocaleString()})`, true)
            .addField('Recovered', `${data.recovered.toLocaleString()}\n(+${data.todayRecovered.toLocaleString()})`, true)
            .addField('Critical', `${data.critical.toLocaleString()}\n(${data.todayCritical >= 0 ? '+' : '-'}${data.todayCritical.toLocaleString()})`, true)
            .addField('Tests', `${data.tests.toLocaleString()}\n(${data.todayTests >= 0 ? '+' : '-'}${data.todayTests.toLocaleString()})`, true)
            .setColor(data.recovered > data.deaths ? 'GREEN' : data.deaths > data.recovered ? '#FFFF00' : 'GREEN')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            return message.inlineReply(embed);
        }
    }
}