const Command = require("../../base/classes/Command");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const covid = require("novelcovid");

const chartCallback = (ChartJS) => {
    ChartJS.plugins.register({
        beforeDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    });
}

class CovChartCommand extends Command {
    constructor() {
        super({
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
            let data = await covid.historical.all({ days: -1 });
            if(!data) return message.channel.send(client.sendErrorEmbed(`An error occurred.`));

            const labels = [];
            const deaths = [];
            const cases = [];
            const recovered = [];

            for(let data of Object.keys(data.cases)) {
                labels.push(data.cases.data[data]);

                deaths.push(data.deaths[data]);
                cases.push(data.cases[data]);
                recovered.push(data.recovered[data]);
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

            // @ts-ignore
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
            let data = await covid.historical.countries({ country: args.join(' ') });

            if(!data.timeline) return message.channel.send(client.sendErrorEmbed(`That country doesn't seem to exist.`));

            const labels = [];
            const deaths = [];
            const cases = [];
            const recovered = [];

            for(let data of Object.keys(data.timeline.cases)) {
                labels.push(data.timeline.cases[data]);

                deaths.push(data.timeline.deaths[data]);
                cases.push(data.timeline.cases[data]);
                recovered.push(data.timeline.recovered[data]);
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
module.exports = CovChartCommand;