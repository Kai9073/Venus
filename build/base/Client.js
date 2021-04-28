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
// const playerOps: PlayerOptions = {
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
    //readonly player: Player;
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
        // this.player
        //     .on('trackStart', (message: Discord.Message, track: Track) => {
        //         let embed = new Discord.MessageEmbed()
        //         .setColor('RANDOM')
        //         .setTitle(`Now Playing - [${track.duration}]`)
        //         .setDescription(`[${track.title}](${track.url})`)
        //         .setThumbnail(track.thumbnail)
        //         .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        //         .setTimestamp();
        //         message.channel.send(embed)
        //     })
        //     .on('error', (error: string, message: Discord.Message) => {
        //         switch(error) {
        //             case 'LiveVideo':
        //                 message.channel.send(`❌ | Live Videos are currently not supported!`);
        //             case 'NotConnected':
        //                 message.channel.send(`❌ | Not connected.`);
        //             case 'NotPlaying':
        //                 message.channel.send(`❌ | Bot isn't playing anything.`);
        //             case 'ParseError':
        //                 message.channel.send(`❌ | There's an error while parsing the playlist!`);
        //             case 'UnableToJoin':
        //                 message.channel.send(`❌ | I'm unable to join the voice channel!`);
        //             case 'VideoUnavailable':
        //                 message.channel.send(`❌ | This video is unavailable!`);
        //             default: 
        //                 message.channel.send(`❌ | An error occurred...`);
        //         }
        //     })
        //     .on('trackAdd', (message: Discord.Message, queue: Queue, track: Track) => {
        //         let embed = new Discord.MessageEmbed()
        //         .setColor('RANDOM')
        //         .setTitle('Added song to queue!')
        //         .setDescription(`[${track.title}](${track.url})`)
        //         .setThumbnail(track.thumbnail)
        //         .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        //         .setTimestamp();
        //         message.channel.send(embed);
        //     })
        //     .on('queueCreate', (message: Discord.Message, queue: Queue) => {
        //         message.channel.send('✅ | Initialized queue!');
        //     })
        //     .on('playlistAdd', (message: Discord.Message, queue: Queue, playlist: Playlist) => {
        //         let embed = new Discord.MessageEmbed()
        //         .setColor('RANDOM')
        //         .setTitle('Added playlist to queue!')
        //         .setDescription(`[${playlist.title}](${playlist.url})`)
        //         .setThumbnail(playlist.thumbnail)
        //         .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        //         .setTimestamp();
        //         message.channel.send(embed);
        //     })
        //     .on('queueEnd', (message: Discord.Message, queue: Queue) => {
        //         message.channel.send(`⚠ | I have left due to empty queue.`);
        //     });
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
        fs_1.default.appendFileSync(`src/logs/${date}.log`, data);
    }
    registerCommands() {
        const commands = glob_1.default.sync(path_1.default.resolve('build/commands/**/*.js'));
        this.log(`[${commands.length}] Loading commands...`);
        for (let command of commands) {
            const File = require(command).default;
            const cmd = new File(this);
            this.commands.set(cmd.name, cmd);
        }
        this.log(`[${this.commands.size}/${commands.length}] Loaded commands!`);
        return this.commands;
    }
    registerEvents() {
        const events = glob_1.default.sync(path_1.default.resolve('build/events/**/*.js'));
        this.log(`[${events.length}] Loading events...`);
        let i = 0;
        for (let event of events) {
            const File = require(event).default;
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
        return this.login(process.env.TOKEN);
    }
}
exports.default = Client;
