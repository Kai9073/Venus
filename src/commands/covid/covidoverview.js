const Command = require('command');
const covid = require('novelcovid');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const Discord = require('discord.js');

const chartCallback = (ChartJS) => {
    ChartJS.defaults.global.defaultFontStyle = 'bold';
    ChartJS.defaults.global.defaultFontColor = '#FFFFFF';
    ChartJS.defaults.global.defaultFontFamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';
    ChartJS.plugins.register({
        beforeDraw: (chart) => {
            const { ctx } = chart;
            ctx.fillStyle = '#2F3136';
            ctx.fillRect(0, 0, 1200, 600);
        }
    })
}

const chart = new ChartJSNodeCanvas({ width: 750, height: 600, chartCallback: chartCallback });

module.exports = class CovidOverviewCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'covidoverview',
            aliases: ['covid19overview', 'coronaoverview', 'coronavirusoverview', 'covoverview'],
            category: 'covid',
            description: 'Get statistics about this stupid virus but in overviews lmao',
            usage: 'covidoverview [country]'
        });
    }

    async run(message, args) {
        if(!args.length) {
            const data = await covid.all();

            const config = {
                type: 'pie',
                data: {
                    labels: ['Active', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            data: [data.active, data.recovered, data.deaths],
                            color: ['#FAE29F', '#7FD99F', '#E26363'],
                            backgroundColor: ['#FAE29F', '#7FD99F', '#E26363'],
                            borderColor: ['#FAE29F', '#7FD99F', '#E26363'],
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: true,
                        labels: {
                            usePointStyle: true,
                            padding: 40,
                            fontSize: 30
                        }
                    }
                }
            }

            const canvas = await chart.renderToBuffer(config);

            const attachment = new Discord.MessageAttachment(canvas, 'chart.png');

            let embed = new Discord.MessageEmbed()
            .setTitle('Global Overview')
            .setDescription('Data provided by Worldometers.')
            .attachFiles([attachment])
            .setImage('attachment://chart.png')
            .setColor('GREEN')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.inlineReply(embed);
        } else {
            const data = await covid.countries({ country: args.join(' ') });

            if(!data) return message.channel.send(`❌ | That country doesn't seem to exist.`);

            const config = {
                type: 'pie',
                data: {
                    labels: ['Active', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            data: [data.active, data.recovered, data.deaths],
                            color: ['#FAE29F', '#7FD99F', '#E26363'],
                            backgroundColor: ['#FAE29F', '#7FD99F', '#E26363'],
                            borderColor: ['#FAE29F', '#7FD99F', '#E26363'],
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: true,
                        labels: {
                            usePointStyle: true,
                            padding: 40,
                            fontSize: 30
                        }
                    }
                }
            }

            const canvas = await chart.renderToBuffer(config);

            const attachment = new Discord.MessageAttachment(canvas, 'chart.png');

            let embed = new Discord.MessageEmbed()
            .setTitle(`${data.country} Overview`)
            .setDescription('Data provided by Worldometers.')
            .attachFiles([attachment])
            .setImage('attachment://chart.png')
            .setColor('GREEN')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.inlineReply(embed);
        }
    }
}