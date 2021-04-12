const Command = require('command');
const Player = require('@modules/Player');
const Track = require('@base/Track');
const ytsr = require('youtube-sr').default;
const ytdl = require('discord-ytdl-core');
const ms = require('pretty-ms');
const { MessageEmbed } = require('discord.js');
// TODO

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            category: 'music',
            description: 'Plays music in a voice channel.',
            usage: 'play <song>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message, args) {
        let player = this.client.player.get(message.guild.id);
        let voiceChannel = message.member.voice.channel;
        if (!player) {
            if(!message.member.voice.channel) return message.inlineReply(`❌ | Please join a voice channel!`);
        } else {
            if(voiceChannel.id !== player.queue.voiceChannel.id) return message.inlineReply(`❌ | You are currently in the wrong voice channel. Please join the ${player.queue.voiceChannel.name}`);
        }
        if(voiceChannel.full && !player) return message.inlineReply(`❌ | I can't join the voice channel, it's full!`);
        if(!voiceChannel.joinable && !player) return message.inlineReply(`❌ | I can't join the voice channel!`);
        if(!voiceChannel.speakable && !player) return message.inlineReply(`❌ | I can't speak in the voice channel!`);

        let type = await Player.validateQuery(args.join(' '));

        let song;

        if(type === 'YTKeywords') {
            try {
                let url = await ytsr.searchOne(args.join(' '), 'video', true);
                let info = await ytdl.getBasicInfo(url.url);
                song = new Track({
                    title: info.videoDetails.title,
                    url: info.videoDetails.video_url,
                    author: info.videoDetails.author.name,
                    duration: ms(info.videoDetails.lengthSeconds * 1000, { compact: true, colonNotation: true }),
                    durationMS: info.videoDetails.lengthSeconds * 1000,
                    discordAuthor: message.author,
                    thumbnail: info.videoDetails.thumbnail.thumbnails[3].url,
                    type: 'YTKeywords',
                    album: null
                });
            } catch(err) {
                player.skip();
                return message.inlineReply(`Failed to add to queue - \`${args.join(' ')}\``);
            }
        } else if(type === 'YTVideo') {
            try {
                let info = await ytdl.getBasicInfo(args[0]);
                song = new Track({
                    title: info.videoDetails.title,
                    url: info.videoDetails.video_url,
                    author: info.videoDetails.author.name,
                    duration: ms(info.videoDetails.lengthSeconds * 1000, { compact: true, colonNotation: true }),
                    durationMS: info.videoDetails.lengthSeconds * 1000,
                    discordAuthor: message.author,
                    thumbnail: info.videoDetails.thumbnail.thumbnails[3].url,
                    type: 'YTKeywords',
                    album: null
                });
            } catch(err) {
                player.skip();
                return message.inlineReply(`❌ | Failed to add to queue - \`${args.join(' ')}\``);
            }
        } else {
            return message.inlineReply(`❌ | The link you sent isn't currently supported to play songs.`);
        }

        if(!player) {
            player = new Player(this.client, message.channel, voiceChannel, message.guild);
            this.client.player.set(message.guild.id, player);
            message.inlineReply(`✅ | Initialized queue!`);

            player.queue.queue.songs.push(song);

            try {
                player.queue.connection = await player.join();
                player.play(song, 0);
            } catch(err) {
                message.inlineReply(`❌ | Failed to play music.`);
            }
        } else {
            player.queue.queue.songs.push(song);
            let embed = new MessageEmbed()
            .setTitle('Added song to queue')
            .setDescription(`[${song.title}](${song.url})`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.inlineReply(embed);
        }
    }
}