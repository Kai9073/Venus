"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const Utils_1 = __importDefault(require("./Utils"));
const Command_1 = __importDefault(require("./Command"));
const Event_1 = __importDefault(require("./Event"));
const discord_player_1 = require("discord-player");
class Client extends discord_js_1.default.Client {
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
        this.player = new discord_player_1.Player(this, {
            enableLive: true,
            leaveOnEmpty: true,
            leaveOnEnd: true,
            leaveOnStop: true,
            autoSelfDeaf: true
        });
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
    }
    registerCommands() {
        const commands = glob_1.default.sync(path_1.default.resolve('build/commands/**/*.js'));
        this.log(`[${commands.length}] Loading commands...`);
        let i;
        for (i = 0; i < commands.length; i++) {
            const File = require(commands[i]).default;
            const isClass = this.utils.isClass(File);
            if (!isClass)
                throw new Error(`${commands[i]} isn't exporting class.`);
            const cmd = new File(this);
            if (!(cmd instanceof Command_1.default))
                throw new Error(`${commands[i]} isn't a Command instance.`);
            this.commands.set(cmd.name, cmd);
        }
        this.log(`[${i}/${commands.length}] Loaded commands!`);
        return this.commands;
    }
    registerDiscordEvents() {
        const events = glob_1.default.sync(path_1.default.resolve('build/events/discord/**/*.js'));
        this.log(`[${events.length}] Loading discord events...`);
        let i;
        for (i = 0; i < events.length; i++) {
            const File = require(events[i]).default;
            const isClass = this.utils.isClass(File);
            if (!isClass)
                throw new Error(`${events[i]} isn't exporting class.`);
            const evt = new File(this);
            if (!(evt instanceof Event_1.default))
                throw new Error(`${events[i]} isn't a Event instance.`);
            this.on(evt.name, (...args) => {
                evt.run(...args);
            });
        }
        this.log(`[${i}/${events.length}] Loaded discord events!`);
    }
    registerPlayerEvents() {
        const events = glob_1.default.sync(path_1.default.resolve('build/events/player/*.js'));
        this.log(`[${events.length}] Loading player events...`);
        let i;
        for (i = 0; i < events.length; i++) {
            const File = require(events[i]).default;
            const isClass = this.utils.isClass(File);
            if (!isClass)
                throw new Error(`${events[i]} isn't exporting class.`);
            const evt = new File(this);
            if (!(evt instanceof Event_1.default))
                throw new Error(`${events[i]} isn't a Event instance.`);
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
exports.default = Client;
