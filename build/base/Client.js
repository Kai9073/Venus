"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const Utils_1 = __importDefault(require("./Utils"));
// import { Player } from 'discord-player';
const Command_1 = __importDefault(require("./Command"));
const Event_1 = __importDefault(require("./Event"));
// const playerOps = {
//     enableLive: false,
//     leaveOnEnd: true,
//     leaveOnEndCooldown: 15000,
//     leaveOnStop: true,
//     leaveOnEmpty: true,
//     leaveOnEmptyCooldown: 15000,
//     autoSelfDeaf: true,
//     quality: 'high'
// }
class Client extends discord_js_1.default.Client {
    // readonly player: Player;
    constructor() {
        super({
            intents: discord_js_1.default.Intents.ALL,
            ws: {
                properties: {
                    $browser: 'Discord Android'
                }
            }
        });
        this.commands = new discord_js_1.default.Collection();
        this.cooldown = new discord_js_1.default.Collection();
        this.utils = new Utils_1.default(this);
        // this.player = new Player(this, playerOps);
    }
    log(info, severity) {
        let type;
        if (severity === 0) {
            type = `[INFO]`;
            console.log(chalk_1.default.green(`[INFO]`), info);
        }
        else if (severity === 1) {
            type = `[WARNING]`;
            console.log(chalk_1.default.bgYellowBright(`[WARNING]`), info);
        }
        else if (severity === 2) {
            type = `[ERROR]`;
            console.log(chalk_1.default.redBright(`[ERROR]`), info);
        }
        else if (severity === 3) {
            type = `[EMERGENCY]`;
            console.log(chalk_1.default.bgRed(`[EMERGENCY]`), info);
        }
        else {
            type = `[LOG]`;
            console.log(chalk_1.default.blueBright(`[LOG]`), info);
        }
        let date = `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`;
        let data = `[${moment_1.default().format('MMMM Do YYYY, h:mm:ss a')}] ${type} ${info}\n`;
        fs_1.default.appendFileSync(`build/logs/${date}.log`, data);
    }
    registerCommands() {
        const commands = glob_1.default.sync(path_1.default.resolve('build/commands/**/*.js'));
        this.log(`[${commands.length}] Loading commands...`);
        for (let command of commands) {
            const File = require(command).default;
            const isClass = this.utils.isClass(File);
            if (!isClass)
                throw new Error(`${command} isn't exporting class.`);
            const cmd = new File(this);
            if (!(cmd instanceof Command_1.default))
                throw new Error(`${command} isn't a Command instance.`);
            this.commands.set(cmd.name, cmd);
        }
        this.log(`[${this.commands.size}/${commands.length}] Loaded commands!`);
        return this.commands;
    }
    registerDiscordEvents() {
        const events = glob_1.default.sync(path_1.default.resolve('build/events/discord/**/*.js'));
        this.log(`[${events.length}] Loading discord events...`);
        let i = 0;
        for (let event of events) {
            const File = require(event).default;
            const isClass = this.utils.isClass(File);
            if (!isClass)
                throw new Error(`${event} isn't exporting class.`);
            const evt = new File(this);
            if (!(evt instanceof Event_1.default))
                throw new Error(`${event} isn't a Event instance.`);
            this.on(evt.name, (...args) => {
                evt.run(...args);
            });
            i++;
        }
        this.log(`[${i}/${events.length}] Loaded discord events!`);
    }
    // registerPlayerEvents() {
    //     const events = glob.sync(path.resolve('build/events/player/*.js'));
    //     this.log(`[${events.length}] Loading player events...`);
    //     let i = 0;
    //     for(let event of events) {
    //         const File = require(event).default;
    //         const isClass = this.utils.isClass(File);
    //         if(!isClass) throw new Error(`${event} isn't exporting class.`);
    //         const evt = new File(this);
    //         if(!(evt instanceof Event)) throw new Error(`${event} isn't a Event instance.`);
    //         this.player.on(evt.name, (...args) => {
    //             evt.run(...args);
    //         });
    //         i++;
    //     }
    //     this.log(`[${i}/${events.length}] Loaded player events!`);
    // }
    async connect() {
        await this.registerCommands();
        this.registerDiscordEvents();
        // this.registerPlayerEvents();
        return this.login(process.env.TOKEN);
    }
}
exports.default = Client;
