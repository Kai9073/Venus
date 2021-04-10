const Discord = require('discord.js');
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Utils = require('./Utils');

module.exports = class Client extends Discord.Client {
    constructor() {
        super({
            disableMentions: 'everyone',
            ws: {
                intents: Discord.Intents.ALL, 
                properties: {
                    $browser: 'Discord Android'
                }
            }
        });

        this.commands = new Discord.Collection();
        this.cooldown = new Discord.Collection();
        this.utils = new Utils(this);
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

        fs.appendFileSync(`src/logs/${date}.log`, data);
    }

    registerCommands() {
        const commands = glob.sync(path.resolve('src/commands/**/*')).filter(file => file.endsWith('.js'));
        this.log(`[${commands.length}] Loading commands...`);

        for(let command of commands) {
            const File = require(command);
            const cmd = new File(this);

            this.commands.set(cmd.name, cmd);
        }

        this.log(`[${this.commands.array().length}/${commands.length}] Loaded commands!`);

        return this.commands;
    }

    registerEvents() {
        const events = glob.sync(path.resolve('src/events/**/*.js'));
        this.log(`[${events.length}] Loading events...`);
        
        let i = 0;

        for(let event of events) {
            const File = require(event);
            const evt = new File(this);

            this.on(evt.name, (...args) => {
                evt.run(...args);
            });

            i++;
        }

        this.log(`[${i}/${events.length}] Loaded events!`);
    }

    async connect() {
        await this.registerCommands();
        this.registerEvents();
        this.login(process.env.TOKEN);
    }
}