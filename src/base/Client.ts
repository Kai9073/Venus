import Discord, { User } from 'discord.js';
import glob from 'glob';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import moment from 'moment';
import Utils from './Utils';
// import { Player, PlayerOptions, Playlist, Queue, Track } from 'discord-player';
import Command from './Command';
import Event from './Event';

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

export default class Client extends Discord.Client {
    readonly commands: Discord.Collection<string, Command>;
    readonly cooldown: Discord.Collection<string, Discord.Collection<string, number>>;
    readonly utils: Utils;
    //readonly player: Player;
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

    log(info: string, severity?: 0 | 1 | 2| 3) {
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
        const commands = glob.sync(path.resolve('build/commands/**/*.js'));
        this.log(`[${commands.length}] Loading commands...`);

        for(let command of commands) {
            const File = require(command).default;
            const isClass = this.utils.isClass(File);
            if(!isClass) throw new Error(`${command} isn't exporting class.`);
            const cmd = new File(this);
            if(cmd instanceof Command) throw new Error(`${command} isn't a Command instance.`);

            this.commands.set(cmd.name, cmd);
        }

        this.log(`[${this.commands.size}/${commands.length}] Loaded commands!`);

        return this.commands;
    }

    registerEvents() {
        const events = glob.sync(path.resolve('build/events/**/*.js'));
        this.log(`[${events.length}] Loading events...`);
        
        let i = 0;

        for(let event of events) {
            const File = require(event).default;
            const isClass = this.utils.isClass(File);
            if(!isClass) throw new Error(`${event} isn't exporting class.`);
            const evt = new File(this);
            if(!(evt instanceof Event)) throw new Error(`${event} isn't a Command instance.`);

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