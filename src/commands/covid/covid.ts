import Command from '../../base/Command';
import Discord, { MessageEmbed } from 'discord.js';
import axios from 'axios';
import Client from '../../base/Client';

export default class CovidCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'covid',
            aliases: ['covid19', 'corona', 'coronavirus', 'cov'],
            category: 'covid',
            description: 'Get statistics about this stupid virus lmao',
            usage: 'covid [country]'
        });
    }

    async run(message: Discord.Message, args: string[]) {
        try {
            if(!args.length) {
                const { data } = await axios.get('https://disease.sh/v3/covid-19/all');
                const { data: yesterdayData } = await axios.get('https://disease.sh/v3/covid-19/all?yesterday=true');
    
                data['todayActive'] = data.active - yesterdayData.active;
                data['todayCritical'] = data.critical - yesterdayData.critical;
                data['todayTests'] = data.tests -  yesterdayData.tests;
    
                let embed = new MessageEmbed()
                .setTitle('COVID-19 Global Statistics')
                .setDescription('Data provided by Worldometers.')
                .setThumbnail('https://images-ext-1.discordapp.net/external/l_sfF6n50PGj5oKATrkLYY0RNOkO0fAiDu-_HF2rwmc/https/i2x.ai/wp-content/uploads/2018/01/flag-global.jpg')
                .addField('Total Cases', `${data.cases.toLocaleString()}\n(+${data.todayCases.toLocaleString()})`, true)
                .addField('Active Cases', `${data.active.toLocaleString()}\n(${data.todayActive >= 0 ? '+' : ''}${data.todayActive.toLocaleString()})`, true)
                .addField('Deaths', `${data.deaths.toLocaleString()}\n(+${data.todayDeaths.toLocaleString()})`, true)
                .addField('Recovered', `${data.recovered.toLocaleString()}\n(+${data.todayRecovered.toLocaleString()})`, true)
                .addField('Critical', `${data.critical.toLocaleString()}\n(${data.todayCritical >= 0 ? '+' : ''}${data.todayCritical.toLocaleString()})`, true)
                .addField('Tests', `${data.tests.toLocaleString()}\n(${data.todayTests >= 0 ? '+' : ''}${data.todayTests.toLocaleString()})`, true)
                .addField('Population', data.population.toLocaleString(), true)
                .addField('Infection Rate', `${(data.casesPerOneMillion / 10000).toFixed(4)}%`, true)
                .addField('Recovery Rate', `${(data.recovered / data.cases * 100).toFixed(4)}%`, true)
                .addField('Fatality Rate', `${(data.deaths / data.cases * 100).toFixed(4)}%`, true)
                .addField('Critical Rate', `${(data.critical / data.cases * 100).toFixed(4)}%`, true)
                .addField('Test Rate', `${(data.testsPerOneMillion / 10000).toFixed(4)}%`, true)
                .setColor(data.recovered > data.deaths && data.todayCases < 1000 ? 'GREEN' : data.deaths > data.recovered || data.todayCases > 1000 ? 'RED' : 'RED')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
                message.reply(embed);
            } else {
                const { data } = await axios.get(`https://disease.sh/v3/covid-19/countries/${args.join(' ')}`);
                const { data: yesterdayData } = await axios.get(`https://disease.sh/v3/covid-19/countries/${args.join(' ')}?yesterday=true`);
    
                if(!data.cases || !yesterdayData.cases) message.reply(`❌ | That country doesn't seem to exist.`);
    
                data.todayActive = data.active - yesterdayData.active;
                data.todayCritical = data.critical - yesterdayData.critical; 
                data.todayTests = data.tests -  yesterdayData.tests;
    
                let embed = new MessageEmbed()
                .setTitle(`COVID-19 ${data.country}, ${data.continent} Statistics`)
                .setDescription('Data provided by Worldometers.')
                .setThumbnail(data.countryInfo.flag)
                .addField('Total Cases', `${data.cases.toLocaleString()}\n(+${data.todayCases.toLocaleString()})`, true)
                .addField('Active Cases', `${data.active.toLocaleString()}\n(${data.todayActive >= 0 ? '+' : ''}${data.todayActive.toLocaleString()})`, true)
                .addField('Deaths', `${data.deaths.toLocaleString()}\n(+${data.todayDeaths.toLocaleString()})`, true)
                .addField('Recovered', `${data.recovered.toLocaleString()}\n(+${data.todayRecovered.toLocaleString()})`, true)
                .addField('Critical', `${data.critical.toLocaleString()}\n(${data.todayCritical >= 0 ? '+' : ''}${data.todayCritical.toLocaleString()})`, true)
                .addField('Tests', `${data.tests.toLocaleString()}\n(${data.todayTests >= 0 ? '+' : ''}${data.todayTests.toLocaleString()})`, true)
                .addField('Population', data.population.toLocaleString(), true)
                .addField('Infection Rate', `${(data.casesPerOneMillion / 10000).toFixed(4)}%`, true)
                .addField('Recovery Rate', `${(data.recovered / data.cases * 100).toFixed(4)}%`, true)
                .addField('Fatality Rate', `${(data.deaths / data.cases * 100).toFixed(4)}%`, true)
                .addField('Critical Rate', `${(data.critical / data.cases * 100).toFixed(4)}%`, true)
                .addField('Test Rate', `${(data.testsPerOneMillion / 10000).toFixed(4)}%`, true)
                .setColor(data.todayRecovered > data.todayDeaths && data.todayCases < 1000 ? 'GREEN' : data.deaths > data.recovered || data.todayCases > 1000 ? 'RED' : 'RED')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
                message.reply(embed);
            }
        } catch(err) {
            message.reply('❌ | An error occurred...');
        }
    }
}