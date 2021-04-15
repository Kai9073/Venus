const Discord = require('discord.js');
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Utils = require('./Utils');
const { Player } = require('discord-player');

const playerOps = {
    enableLive: false,
    leaveOnEnd: true,
    leaveOnEndCooldown: 15000,
    leaveOnStop: true,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 15000,
    autoSelfDeaf: true,
    quality: 'high',
    ytdlRequestOptions: {
        requestOptions: {
            headers: {
                cookie: 'PREF=tz=Asia.Manila&f6=400; SID=8gdY4_-49s549sGk9he9gd2SCkbQF3Dhq_doJelB3UwWvvoluU8ulUZ084JIA6zS5cihOw.; APISID=ntBShT9nCpb2DEV7/ASSjXJShYhtsgzZn4; SAPISID=V-W_XcHwUPrc_Yr2/A2OSVQ_C2lE5xrp14; __Secure-3PAPISID=V-W_XcHwUPrc_Yr2/A2OSVQ_C2lE5xrp14; SIDCC=AJi4QfEqs_oCuF0BU_wEBg1euZook0gCRZPM41qSw1xgkKbTo86zMnsM9BzQus-_XGvQqHnR6LA',
                'x-youtube-identity-token': 'QUFFLUhqbFJFMFpDWjJPaGlmY3BmOGtJOHZBT1l1UXo2QXw\u003d'
            }
        }
    }
}

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

        this.player = new Player(this, playerOps);
        this.player
            .on('trackStart', (message, track) => {
                let embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Playing - [${track.duration}]`)
                .setDescription(`[${track.title}](${track.url})`)
                .setThumbnail(track.thumbnail)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
                message.channel.send(embed)
            })
            .on('error', (error, message) => {
                switch(error) {
                    case 'LiveVideo':
                        message.channel.send(`❌ | Live Videos are currently not supported!`);
                    case 'NotConnected':
                        message.channel.send(`❌ | Not connected.`);
                    case 'NotPlaying':
                        message.channel.send(`❌ | Bot isn't playing anything.`);
                    case 'ParseError':
                        message.channel.send(`❌ | There's an error while parsing the playlist!`);
                    case 'UnableToJoin':
                        message.channel.send(`❌ | I'm unable to join the voice channel!`);
                    case 'VideoUnavailable':
                        message.channel.send(`❌ | This video is unavailable!`);
                    default: 
                        message.channel.send(`❌ | An error occurred...`);
                }
            })
            .on('trackAdd', (message, queue, track) => {
                let embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Added song to queue!')
                .setDescription(`[${track.title}](${track.url})`)
                .setThumbnail(track.thumbnail)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
                message.channel.send(embed);
            })
            .on('queueCreate', (message, queue) => {
                message.channel.send('✅ | Initialized queue!');
            })
            .on('playlistAdd', (message, queue, playlist) => {
                let embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Added playlist to queue!')
                .setDescription(`[${playlist.title}](${playlist.url})`)
                .setThumbnail(track.thumbnail)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();
                message.channel.send(embed);
            })
            .on('queueEnd', (message, queue) => {
                message.channel.send(`⚠ | I have left due to empty queue.`);
            });
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