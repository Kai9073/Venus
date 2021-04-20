const Command = require('command');
const axios = require('axios').default;
const Discord = require('discord.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

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

const chart = new ChartJSNodeCanvas({ width: 1200, height: 600, chartCallback: chartCallback });

const vaccine = {};
vaccine.all = async (opts = {}) => {
    let { data } = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage${opts.days ? `?lastdays=${opts.days}` : ''}`);
    return data;
}

vaccine.countries = async (opts = {}) => {
    let { data } = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries${opts.country ? `/${opts.country}` : ''}${opts.days ? `?lastdays=${opts.days}` : ''}`);
    return data;
}

module.exports = class CovidVaccineCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'covidvaccine',
            aliases: ['covid19vaccine', 'coronavaccine', 'coronavirusvaccine', 'covvaccine'],
            category: 'covid',
            description: 'Get statistics about the covid vaccine rollout but in a chart',
            usage: 'covidvaccine [lastDays] | covidvaccine <country> [lastDays]'
        });
    }

    async run(message, args) {
        if(!args.length || (args[0] && Number.isInteger(parseInt(args[0]))) && !args[1]) {
            const data = await vaccine.all({ days: parseInt(args[0]) || -1 });

            if(!data) return message.inlineReply('❌ | Something went wrong...');

            let labels = [];
            let vaccinated = [];
    
            for(let date of Object.keys(data)) {
                labels.push(date);
    
                vaccinated.push(data[date]);
            }
    
            const config = {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Vaccinated',
                            data: vaccinated,
                            color: '#FFFFFF',
                            backgroundColor: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                ticks: {
                                    fontSize: 17,
                                    padding: 5
                                }
                            }
                        ],
                        yAxes: [
                            {
                                display: true,
                                ticks: {
                                    fontSize: 17,
                                    padding: 5,
                                    callback: (number) => number.toLocaleString()
                                }
                            }
                        ]
                    },
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
            .setTitle('Global Vaccination Timeline')
            .setDescription('Data provided by John Hopkins University.')
            .attachFiles([attachment])
            .setImage('attachment://chart.png')
            .setColor('GREEN')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.inlineReply(embed);
        } else if((args[0] && isNaN(parseInt(args[0]))) || args[1]) {
            const country = args.slice(0, args.length - 1);
            const data = await vaccine.countries({ country: country.join(' ') || args[0], days: args[1] ? parseInt(args[args.length - 1]) : -1 });

            if(!data.timeline) return message.channel.send(`❌ | That country doesn't seem to exist.`);
    
            let labels = [];
            let vaccinated = [];
    
            for(let date of Object.keys(data.timeline)) {
                labels.push(date);
    
                vaccinated.push(data.timeline[date]);
            }
    
            const config = {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Vaccinated',
                            data: vaccinated,
                            color: '#FFFFFF',
                            backgroundColor: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                ticks: {
                                    fontSize: 17,
                                    padding: 5
                                }
                            }
                        ],
                        yAxes: [
                            {
                                display: true,
                                ticks: {
                                    fontSize: 17,
                                    padding: 5,
                                    callback: (number) => number.toLocaleString()
                                }
                            }
                        ]
                    },
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
            .setTitle(`${data.country} Vaccination Timeline`)
            .setDescription('Data provided by John Hopkins University.')
            .attachFiles([attachment])
            .setImage('attachment://chart.png')
            .setColor('GREEN')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.inlineReply(embed);
        }
    }
}