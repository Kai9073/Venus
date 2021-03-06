import Discord from 'discord.js';
import glob from 'glob';
import path from 'path';
import chalk from 'chalk';
import Utils from './Utils';
import Command from './Command';
import Event from './Event';
import { Player } from 'discord-player';

export default class Client extends Discord.Client {
    readonly commands: Discord.Collection<string, Command>;
    readonly cooldown: Discord.Collection<string, Discord.Collection<string, number>>;
    readonly utils: Utils;
    readonly player: Player;
    constructor() {
        super({
            intents: Discord.Intents.ALL,
            ws: {
                properties: {
                    $browser: 'Discord Android'
                }
            }
        });

        this.commands = new Discord.Collection();
        this.cooldown = new Discord.Collection();
        this.utils = new Utils(this);

        this.player = new Player(this, {
            enableLive: true,
            leaveOnEmpty: true,
            leaveOnEnd: true,
            leaveOnStop: true,
            autoSelfDeaf: true
        });
    }

    log(info: any, severity?: 0 | 1 | 2| 3) {
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
    }

    registerCommands() {
        const commands = glob.sync(path.resolve('build/commands/**/*.js'));
        this.log(`[${commands.length}] Loading commands...`);

        let i;

        for(i = 0; i < commands.length; i++) {
            const File = require(commands[i]).default;
            const isClass = this.utils.isClass(File);
            if(!isClass) throw new Error(`${commands[i]} isn't exporting class.`);
            const cmd = new File(this);
            if(!(cmd instanceof Command)) throw new Error(`${commands[i]} isn't a Command instance.`);

            this.commands.set(cmd.name, cmd);
        }

        this.log(`[${i}/${commands.length}] Loaded commands!`);

        return this.commands;
    }

    registerDiscordEvents() {
        const events = glob.sync(path.resolve('build/events/discord/**/*.js'));
        this.log(`[${events.length}] Loading discord events...`);
        
        let i;

        for(i = 0; i < events.length; i++) {
            const File = require(events[i]).default;
            const isClass = this.utils.isClass(File);
            if(!isClass) throw new Error(`${events[i]} isn't exporting class.`);
            const evt = new File(this);
            if(!(evt instanceof Event)) throw new Error(`${events[i]} isn't a Event instance.`);

            this.on(evt.name, (...args) => {
                evt.run(...args);
            });
        }

        this.log(`[${i}/${events.length}] Loaded discord events!`);
    }

    registerPlayerEvents() {
        const events = glob.sync(path.resolve('build/events/player/*.js'));
        this.log(`[${events.length}] Loading player events...`);

        let i;

        for(i = 0; i < events.length; i++) {
            const File = require(events[i]).default;
            const isClass = this.utils.isClass(File);
            if(!isClass) throw new Error(`${events[i]} isn't exporting class.`);
            const evt = new File(this);
            if(!(evt instanceof Event)) throw new Error(`${events[i]} isn't a Event instance.`);

            this.player.on(evt.name, (...args) => {
                evt.run(...args);
            });
        }

        this.log(`[${i}/${events.length}] Loaded player events!`);
    }

    async connect() {
        await this.registerCommands();
        this.registerDiscordEvents();
        this.registerPlayerEvents();
        return this.login(process.env.TOKEN);
    }
}