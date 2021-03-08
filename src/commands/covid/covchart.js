const covid = require('novelcovid');
const Command = require('command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const chartCallback = (ChartJS) => {
    ChartJS.plugins.register({
        beforeInit: function(chart){
			chart.legend.afterFit = function() { this.height += 35 }
		},
        beforeDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();
            ctx.fillStyle = '#2F3136';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    });
}

module.exports = class CovidChartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'covchart',
            aliases: ['covidchart', 'coronachart', 'coronaviruschart'],
            category: 'covid',
            description: 'Returns coronavirus statistics in a chart.',
            usage: 'covchart [country]'
        });
    }

    async run(client, message, args) {
        const m = await message.channel.send(client.sendWaitEmbed(`Generating chart...`));
        if(!args.length) {
            let data = await covid.historical.all({ days: -1 }).catch(err => client.log(err, 2));
            let dates = Object.keys(data.cases);

            const labels = [];
            const deaths = [];
            const cases = [];
            const recovered = [];

            for(let result of dates) {
                labels.push(result);

                deaths.push(data.deaths[result]);
                cases.push(data.cases[result]);
                recovered.push(data.recovered[result]);
            }

            const canvas = new ChartJSNodeCanvas({ width: 800, height: 600, chartCallback: chartCallback });

            const config = {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Cases',
                            data: cases,
                            color: '#7289d9',
                            backgroundColor: '#7289d9',
                            borderColor: '#7289d9',
                            fill: false,
                        },
                        {
                            label: 'Deaths',
                            data: deaths,
                            color: '#FF0000',
                            backgroundColor: '#FF0000',
                            borderColor: '#FF0000',
                            fill: false,
                        },
                        {
                            label: 'Recovered',
                            data: recovered,
                            color: '#82D305',
                            backgroundColor: '#82D305',
                            borderColor: '#82D305',
                            fill: false,
                        }
                    ]
                }
            };

            const image = await canvas.renderToBuffer(config);

            const attachment = new MessageAttachment(image, 'covchart.png');

            let embed = new MessageEmbed()
            .setTitle('Covid-19 World Statistics Chart')
            .attachFiles([attachment])
            .setImage('attachment://covchart.png')
            .setColor('RANDOM');
            m.delete();
            message.channel.send(embed);
        } else {
            let data = await covid.historical.countries({ country: args.join(' '), days: -1 });

            if(!data.timeline) return message.channel.send(client.sendErrorEmbed(`That country doesn't seem to exist.`));

            let dates = Object.keys(data.timeline.cases);

            const labels = [];
            const deaths = [];
            const cases = [];
            const recovered = [];

            for(let result of dates) {
                labels.push(result);

                deaths.push(data.timeline.deaths[result]);
                cases.push(data.timeline.cases[result]);
                recovered.push(data.timeline.recovered[result]);
            }

            const canvas = new ChartJSNodeCanvas({ width: 800, height: 600, chartCallback: chartCallback });

            const config = {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Cases',
                            data: cases,
                            color: '#7289d9',
                            backgroundColor: '#7289d9',
                            borderColor: '#7289d9',
                            fill: false,
                        },
                        {
                            label: 'Deaths',
                            data: deaths,
                            color: '#FF0000',
                            backgroundColor: '#FF0000',
                            borderColor: '#FF0000',
                            fill: false,
                        },
                        {
                            label: 'Recovered',
                            data: recovered,
                            color: '#82D305',
                            backgroundColor: '#82D305',
                            borderColor: '#82D305',
                            fill: false,
                        }
                    ]
                }
            };

            const image = await canvas.renderToBuffer(config);

            let attachment = new MessageAttachment(image, 'covchart.png');
            
            let embed = new MessageEmbed()
            .setTitle('Covid-19 ' + data.country + ' Statistics Chart')
            .attachFiles([attachment])
            .setImage('attachment://covchart.png')
            .setColor('RANDOM');
            m.delete();
            message.channel.send(embed);
        }
    }
}