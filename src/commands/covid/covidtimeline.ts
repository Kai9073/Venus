import Discord from 'discord.js';
import Client from '../../base/Client';
import Command from '../../base/Command';
import axios from 'axios';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const chartCallback = (ChartJS: any) => {
    ChartJS.defaults.global.defaultFontStyle = 'bold';
    ChartJS.defaults.global.defaultFontColor = '#FFFFFF';
    ChartJS.defaults.global.defaultFontFamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';
    ChartJS.plugins.register({
        beforeDraw: (chart: any) => {
            const { ctx } = chart;
            ctx.fillStyle = '#2F3136';
            ctx.fillRect(0, 0, 1200, 600);
        }
    })
}

const chart = new ChartJSNodeCanvas({ width: 1200, height: 600, chartCallback: chartCallback });

export default class CovidTimelineCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'covidtimeline',
            aliases: ['covid19timeline', 'coronatimeline', 'coronavirustimeline', 'covtimeline'],
            category: 'covid',
            description: 'Get statistics about this stupid virus but in timelines lmao',
            usage: 'covidtimeline [lastDays] | covidtimeline <country> [lastDays]'
        });
    }

    async run(message: Discord.Message, args: string[]) {
        try {
            if(!args.length || (args[0] && Number.isInteger(parseInt(args[0]))) && !args[1]) {
                const { data } = await axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=${parseInt(args[0]) || -1}`);
    
                if(!data) return message.reply('❌ | Something went wrong...');
    
                let labels = [];
                let cases = [];
                let active = [];
                let recovered = [];
                let deaths = [];
        
                for(let date of Object.keys(data.cases)) {
                    labels.push(date);
        
                    cases.push(data.cases[date]);
                    active.push(data.cases[date] - data.recovered[date] - data.deaths[date]);
                    recovered.push(data.recovered[date]);
                    deaths.push(data.deaths[date]);
                }
        
                const config = {
                    type: 'line',
                    data: {
                        labels,
                        datasets: [
                            {
                                label: 'Cases',
                                data: cases,
                                color: '#FFFFFF',
                                backgroundColor: '#FFFFFF',
                                borderColor: '#FFFFFF',
                                fill: false
                            },
                            {
                                label: 'Active',
                                data: active,
                                color: '#FAE29F',
                                backgroundColor: '#FAE29F',
                                borderColor: '#FAE29F',
                                fill: false
                            },
                            {
                                label: 'Recovered',
                                data: recovered,
                                color: '#7FD99F',
                                backgroundColor: '#7FD99F',
                                borderColor: '#7FD99F',
                                fill: false
                            },
                            {
                                label: 'Deaths',
                                data: deaths,
                                color: '#E26363',
                                backgroundColor: '#E26363',
                                borderColor: '#E26363',
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
                                        callback: (number: any) => number.toLocaleString()
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
                .setTitle('Global Timeline')
                .setDescription('Data provided by John Hopkins University.')
                .attachFiles([attachment])
                .setImage('attachment://chart.png')
                .setColor('GREEN')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
                message.reply(embed);
            } else if((args[0] && isNaN(parseInt(args[0]))) || args[1]) {
                const country = args.slice(0, args.length - 1);
                const { data } = await axios.get(`https://disease.sh/v3/covid-19/historical/${country.join(' ') || args[0]}?lastdays=${args[1] ? parseInt(args[args.length - 1]) : -1}`);
    
                if(!data.timeline) return message.channel.send(`❌ | That country doesn't seem to exist.`);
        
                let labels = [];
                let cases = [];
                let active = [];
                let recovered = [];
                let deaths = [];
        
                for(let date of Object.keys(data.timeline.cases)) {
                    labels.push(date);
        
                    cases.push(data.timeline.cases[date]);
                    active.push(data.timeline.cases[date] - data.timeline.recovered[date] - data.timeline.deaths[date]);
                    recovered.push(data.timeline.recovered[date]);
                    deaths.push(data.timeline.deaths[date]);
                }
        
                const config = {
                    type: 'line',
                    data: {
                        labels,
                        datasets: [
                            {
                                label: 'Cases',
                                data: cases,
                                color: '#FFFFFF',
                                backgroundColor: '#FFFFFF',
                                borderColor: '#FFFFFF',
                                fill: false
                            },
                            {
                                label: 'Active',
                                data: active,
                                color: '#FAE29F',
                                backgroundColor: '#FAE29F', 
                                borderColor: '#FAE29F',
                                fill: false
                            },
                            {
                                label: 'Recovered',
                                data: recovered,
                                color: '#7FD99F',
                                backgroundColor: '#7FD99F',
                                borderColor: '#7FD99F',
                                fill: false
                            },
                            {
                                label: 'Deaths',
                                data: deaths,
                                color: '#E26363',
                                backgroundColor: '#E26363',
                                borderColor: '#E26363',
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
                                        callback: (number: any) => number.toLocaleString()
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
                .setTitle(`${data.country} Timeline`)
                .setDescription('Data provided by John Hopkins University.')
                .attachFiles([attachment])
                .setImage('attachment://chart.png')
                .setColor('GREEN')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
                message.reply(embed);
            }
        } catch(err) {
            message.reply('❌ | An error occurred...');
        }
    }
}