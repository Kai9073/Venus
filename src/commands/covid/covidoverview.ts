import Command from '../../base/Command';
import axios from 'axios';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import Discord from 'discord.js';
import Client from '../../base/Client';

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

const chart = new ChartJSNodeCanvas({ width: 750, height: 600, chartCallback: chartCallback });

export default class CovidOverviewCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'covidoverview',
            aliases: ['covid19overview', 'coronaoverview', 'coronavirusoverview', 'covoverview'],
            category: 'covid',
            description: 'Get statistics about this virus but in overviews lmao',
            usage: 'covidoverview [country]'
        });
    }

    async run(message: Discord.Message, args: string[]) {
        try {
            if(!args.length) {
                const { data } = await axios.get('https://disease.sh/v3/covid-19/all');
    
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
                message.reply(embed);
            } else {
                const { data } = await axios.get(`https://disease.sh/v3/covid-19/countries/${args.join(' ')}`);
    
                if(!data) return message.reply(`❌ | That country doesn't seem to exist.`);
    
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
                message.reply(embed);
            }
        } catch(err) {
            message.reply('❌ | An error occurred...');
        }
    }
}