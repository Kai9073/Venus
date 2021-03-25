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

        this.queue = new Map();
        this.utils = Utils;
        this.commands = new Discord.Collection();
        this.cooldown = new Discord.Collection();
    }

    /**
     * Logs information about things happening with the bot.
     * @param {string} info Information about the event or something
     * @param {0|1|2|3} severity How severe is that information
     */
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

    /**
     * Loads all commands found in the src/commands directory.
     */
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

    /**
     * Loads all client events found in the src/events/client directory.
     */
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

    /**
     * Simple embed used to indicate an error happened.
     * @param {string} info Information to be sent in discord 
     * @returns {Discord.MessageEmbed} Discord Embed
     * @example client.sendErrorEmbed(`Failed to send message.`);
     */
    sendErrorEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`❌ | ${info}`)
        .setColor('#FF0000');
        return embed;
    }

    /**
     * Simple embed used to indicate the bot successfully did something.
     * @param {string} info Information to be sent in discord
     * @returns {Discord.MessageEmbed} Discord Embed
     * @example client.sendSuccessEmbed(`Successfully sent a message.`);
     */
    sendSuccessEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`✅ **|** ${info}`)
        .setColor('GREEN');
        return embed;
    }

    /**
     * Simple embed used to indicate the bot is warning something.
     * @param {string} info Information to be sent in discord
     * @returns {Discord.MessageEmbed} Discord Embed
     * @example client.sendWarningEmbed(`Bot can't send a message soon.`);
     */
    sendWarningEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`⚠ **|** ${info}`)
        .setColor('YELLOW');
        return embed;
    }

    /**
     * Simple embed used to indicate the bot is generating/making/executing a process.
     * @param {string} info Information to be sent in discord
     * @returns {Discord.MessageEmbed} Discord Embed
     * @example client.sendWaitEmbed(`Bot is sending a message.`);
     */
    sendWaitEmbed(info) {
        let embed = new Discord.MessageEmbed()
        .setDescription(`<a:loading:803081781707407361> **|** ${info}`)
        .setColor('#87ceeb');
        return embed;
    }

    /**
     * Simple embed used to generate an embed easily.
     * @param {string} info Information to be sent in discord
     * @returns {Discord.MessageEmbed} Discord Embed
     * @example client.sendCustomEmbed('❤', 'Thank you for using Venus-Bot', '#FF0000');
     */
    sendCustomEmbed(emoji, info, color = '#87CEEB') {
        let embed = new Discord.MessageEmbed()
        .setDescription(`${emoji} **|** ${info}`)
        .setColor(color);
        return embed;
    }

    resolveUser(usernameOrUserResolvable, multiple = false) {
        if (usernameOrUserResolvable && typeof usernameOrUserResolvable === "string" && !parseInt(usernameOrUserResolvable)) {
            const name = usernameOrUserResolvable.toUpperCase();
            const arr = [];
            this.users.cache.forEach(user => {
                if (user.username.toUpperCase().indexOf(name) < 0) return;
                return arr.push(user);
            });
            return multiple ? arr : arr[0];
        } else {
            return usernameOrUserResolvable ? (multiple ? [this.users.resolve(usernameOrUserResolvable)] : this.users.resolve(usernameOrUserResolvable)) : null;
        }
    }

    /**
     * Login to Discord.
     */
    connect() {
        this.log(`Starting the bot...`);
        this.loadCommands();
        this.loadEvents();
        // eslint-disable-next-line no-undef
        this.login(process.env.TOKEN).catch((err) => this.log(err, 2));
    }
}

module.exports = Client;