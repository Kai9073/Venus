const covid = require("novelcovid");
const Command = require("../../base/classes/Command");
const { MessageEmbed } = require("discord.js");

class CovidCommand extends Command {
    constructor() {
        super({
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
            
            let yesterdayData = await covid.yesterday.all();
            
            data.todayCritical = data.critical - yesterdayData.critical;
            data.todayTests = data.tests - yesterdayData.tests;
            data.todayActive = data.active - yesterdayData.active;

            let embed = new MessageEmbed()
            .setTitle('Covid-19 World Statistics')
            .addField('Cases', `${data.cases.toLocaleString()}\n(+${data.todayCases.toLocaleString()})`, true)
            .addField('Active Cases', `${data.active.toLocaleString()}\n(${data.todayActive >= 0 ? '+' : '-'}${data.todayActive.toLocaleString()})`, true)
            .addField('Recoveries', `${data.recovered.toLocaleString()}\n(+${data.todayRecovered.toLocaleString()})`, true)
            .addField('Death', `${data.deaths.toLocaleString()}\n(${data.todayDeaths.toLocaleString()})`, true)
            .addField('Critical', `${data.critical.toLocaleString()}\n(${data.todayCritical >= 0 ? '+' : '-'}${data.todayCritical.toLocaleString()})`, true)
            .addField('Tests', `${data.tests.toLocaleString()}\n(${data.todayTests >= 0 ? '+' : '-'}${data.todayTests.toLocaleString()})`, true)
            .setColor('RANDOM')
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/1/11/Globe_Flag.svg')
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.channel.send(embed);
        } else {
            let data = await covid.countries({ country: args.join(' ') });

            if(!data.cases) return message.channel.send(client.sendErrorEmbed(`That country doesn't seem to exist.`));

            let yesterdayData = await covid.yesterday.countries({ country: args.join(' ') });

            data.todayCritical = data.critical - yesterdayData.critical;
            data.todayTests = data.tests - yesterdayData.tests;
            data.todayActive = data.active - yesterdayData.active;
    
            let embed = new MessageEmbed()
            .setTitle('Covid-19 ' + data.country + ' Statistics')
            .addField('Cases', `${data.cases.toLocaleString()}\n(+${data.todayCases.toLocaleString()})`, true)
            .addField('Active Cases', `${data.active.toLocaleString()}\n(${data.todayActive >= 0 ? '+' : '-'}${data.todayActive.toLocaleString()})`, true)
            .addField('Recoveries', `${data.recovered.toLocaleString()}\n(+${data.todayRecovered.toLocaleString()})`, true)
            .addField('Death', `${data.deaths.toLocaleString()}\n(${data.todayDeaths.toLocaleString()})`, true)
            .addField('Critical', `${data.critical.toLocaleString()}\n(${data.todayCritical >= 0 ? '+' : '-'}${data.todayCritical.toLocaleString()})`, true)
            .addField('Tests', `${data.tests.toLocaleString()}\n(${data.todayTests >= 0 ? '+' : '-'}${data.todayTests.toLocaleString()})`, true)
            .setColor('RANDOM')
            .setThumbnail(data.countryInfo.flag)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.channel.send(embed);
        }
    }
}

module.exports = CovidCommand;