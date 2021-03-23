const Discord = require('discord.js');
const chalk = require('chalk');
const Utils = require('./utils/Utils');
const { sync } = require('glob');
const { resolve } = require('path');
const fs = require('fs');
const moment = require('moment');

class Client extends Discord.Client {
    constructor() {
        super({
            disableMentions: 'everyone',
            ws: {
                intents: Discord.Intents.ALL
            }
        });

        this.utils = Utils;
        this.commands = new Discord.Collection();
        this.cooldown = new Discord.Collection();
    }

    log(info, severity) {
        let type;
        if(severity === 0) {
            type = `[INFO]`;
            console.log(chalk.green(`[INFO]`), info);
        } else if(severity === 1) {
            type = `[WARNING]`;
            console.log(chalk.bgYellowBright(`[WARNING]`), info);
        } else if(severity === 2) {
            type = `[ERROR]`;
            console.log(chalk.redBright(`[ERROR]`), info);
        } else if(severity === 3) {
            type = `[EMERGENCY]`;
            console.log(chalk.bgRed(`[EMERGENCY]`), info);
        } else {
            type = `[LOG]`;
            console.log(chalk.blueBright(`[LOG]`), info);
        }

        let date = `${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getFullYear()}`;
        let data = `[${moment().format('MMMM Do YYYY, h:mm:ss a')}] ${type} ${info}\n`;

        fs.appendFileSync(`src/logs/${date}.log`, data, (err) => {
            if(err) console.log(err);
        });
    }

    loadCommands() {
        const commandFiles = sync(resolve('src/commands/**/*')).filter(file => file.endsWith(`.js`));
        this.log(`Loading commands...`);

        let i = 0;

        for(let command of commandFiles) {
            let cmd = require(command);
            cmd = new cmd();

            try {
                this.commands.set(cmd.name, cmd);
                this.log(`[${i + 1}/${commandFiles.length}] Loaded the ${cmd.name} command.`);
                i++;
            } catch(err) {
                this.log(`[${i + 1}/${commandFiles.length}] Failed to load the ${cmd.name} command.`);
                i++;
            }
        }

        this.log(`Loaded ${i} commands out of ${commandFiles.length} commands.`, 0);
    }

    loadEvents() {
        const eventFiles = sync(resolve('src/events/client/*'));
        this.log(`Loading events...`);

        let i = 0;

        for(let event of eventFiles) {
            let evt = require(event);
            evt = new evt();

            this.on(evt.name, (...args) => {
                try {
                    evt.run(this, ...args);
                } catch(err) {
                    this.log(`[${i + 1}/${eventFiles}] Failed to load the ${evt.name} event.`);
                }
            });

            this.log(`[${i + 1}/${eventFiles.length}] Loaded the ${evt.name} event.`);
            i++;
        }

        this.log(`Loaded ${i} events out of ${eventFiles.length} events.`, 0);
    }

    sendErrorEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`❌ | ${info}`)
        .setColor('#FF0000');
        return embed;
    }

    sendSuccessEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`✅ **|** ${info}`)
        .setColor('GREEN');
        return embed;
    }

    sendWarningEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`⚠ **|** ${info}`)
        .setColor('YELLOW');
        return embed;
    }

    sendWaitEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`<a:loading:803081781707407361> **|** ${info}`)
        .setColor('#87ceeb');
        return embed;
    }

    connect() {
        this.log(`Starting the bot...`);
        this.loadCommands();
        this.loadEvents();
        // eslint-disable-next-line no-undef
        return this.login(process.env.TOKEN).catch((err) => this.log(err, 2));
    }
}

module.exports = Client;