"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const axios_1 = __importDefault(require("axios"));
const chartjs_node_canvas_1 = require("chartjs-node-canvas");
const discord_js_1 = __importDefault(require("discord.js"));
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
    });
};
const chart = new chartjs_node_canvas_1.ChartJSNodeCanvas({ width: 750, height: 600, chartCallback: chartCallback });
class CovidOverviewCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'covidoverview',
            aliases: ['covid19overview', 'coronaoverview', 'coronavirusoverview', 'covoverview'],
            category: 'covid',
            description: 'Get statistics about this virus but in overviews lmao',
            usage: 'covidoverview [country]'
        });
    }
    async run(message, args) {
        try {
            if (!args.length) {
                const { data } = await axios_1.default.get('https://disease.sh/v3/covid-19/all');
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
                };
                const canvas = await chart.renderToBuffer(config);
                const attachment = new discord_js_1.default.MessageAttachment(canvas, 'chart.png');
                let embed = new discord_js_1.default.MessageEmbed()
                    .setTitle('Global Overview')
                    .setDescription('Data provided by Worldometers.')
                    .attachFiles([attachment])
                    .setImage('attachment://chart.png')
                    .setColor('GREEN')
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                    .setTimestamp();
                message.reply(embed);
            }
            else {
                const { data } = await axios_1.default.get(`https://disease.sh/v3/covid-19/countries/${args.join(' ')}`);
                if (!data)
                    return message.reply(`❌ | That country doesn't seem to exist.`);
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
                };
                const canvas = await chart.renderToBuffer(config);
                const attachment = new discord_js_1.default.MessageAttachment(canvas, 'chart.png');
                let embed = new discord_js_1.default.MessageEmbed()
                    .setTitle(`${data.country} Overview`)
                    .setDescription('Data provided by Worldometers.')
                    .attachFiles([attachment])
                    .setImage('attachment://chart.png')
                    .setColor('GREEN')
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                    .setTimestamp();
                message.reply(embed);
            }
        }
        catch (err) {
            message.reply('❌ | An error occurred...');
        }
    }
}
exports.default = CovidOverviewCommand;
