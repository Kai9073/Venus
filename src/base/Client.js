const Discord = require('discord.js');
const config = require('../config/config.js');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const Utils = require('./utils/Utils');
const Command = require('./classes/Command');
const Player = require('../../beta/music/Player');

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
        this.config = config;
        this.queue = new Map();
    }

    log(info, severity) {
        if(severity === 1) {
            console.log(chalk.bgYellowBright(`WARNING`), `${info}`)
        } else if(severity === 2) {
            console.log(chalk.bgRedBright(`ERROR`), `${info}`)
        } else {
            console.log(chalk.greenBright(`INFO`), `${info}`);
        }
    }

    async loadCommands() {
        this.log('Loading commands...');
        // eslint-disable-next-line no-undef
        fs.readdirSync(path.join(path.dirname(__dirname), `commands`)).forEach((dir) => {
            // eslint-disable-next-line no-undef
            const commands = fs.readdirSync(path.join(path.dirname(__dirname), `commands`, dir)).filter((files) => files.endsWith('.js'));

            for(let command of commands) {
                // eslint-disable-next-line no-undef
                const Command = require(path.join(path.dirname(__dirname), `commands`, dir, command));
                const cmd = new Command(this);
                try {
                    this.log(`Loaded the ${cmd.name} command!`);
                    this.commands.set(cmd.name, cmd);
                } catch(err) {
                    this.log(`Failed to load ${cmd.name}: ${err}.`, 2);
                    continue;
                }
            }
        });
    }

    async loadEvents() {
        this.log('Loading events...');
        // eslint-disable-next-line no-undef
        const events = fs.readdirSync(path.join(path.dirname(__dirname), `events`)).filter((files) => files.endsWith('.js'));

        for(let event of events) {
            // eslint-disable-next-line no-undef
            const Event = require(path.join(path.dirname(__dirname), `events`, event));
            const evt = new Event(this);
            const eventName = event.replace('.js', '');

            this.log(`Loaded the ${eventName} event!`);
            this.on(eventName, (...args) => evt.run(...args));
        }
    }

    sendErrorEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`<:error:811066653042278420> **|** ${info}`)
        .setColor('#FF0000');
        return embed;
    }

    sendSuccessEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`<:check:811060052642496552> **|** ${info}`)
        .setColor('GREEN');
        return embed;
    }

    sendWarningEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`:warning: **|** ${info}`)
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
        this.loadCommands();
        this.loadEvents();
        this.login(this.config.token).catch((err) => this.log(err, 2));
    }
}

module.exports = Client;