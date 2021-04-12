const ytdl = require('discord-ytdl-core');
const ytsr = require('youtube-sr').default;
const { MessageEmbed } = require('discord.js');
const { EventEmitter } = require('events');


// TODO 

module.exports = class Player extends EventEmitter {
    constructor(client, textChannel, voiceChannel, guild) {
        super();

        this.client = client;

        this.queue = {
            guild: guild,
            textChannel: textChannel,
            voiceChannel: voiceChannel,
            connection: null,
            queue: {
                songs: [],
                previousSongs: []
            },
            data: {
                paused: false
            },
            volume: 75
        }
    }

    static validateQuery(query) {
        return ytsr.validate(query, 'VIDEO') ? 'YTVideo' : 'YTKeywords';
    }

    async join() {
        try {
            this.queue.connection = this.queue.voiceChannel.join();
            return this.queue.connection;
        } catch(err) {
            this.end();
            this.queue.textChannel.send(this.client.sendErrorEmbed(`Failed to obtain voice connection.`));
            return null;
        }
    }


    async play(query, seek, filter = false) {
        if(!query) {
            this.queue.voiceChannel.leave();
            this.end();
            return this.queue.textChannel
                .send(`⏹ I have left the voice channel due to empty queue.`)
                .catch(err => console.log(err));
        }

        let stream = ytdl(query.url, {
            quality: 'highestaudio',
            filter: 'audioonly',
            highWaterMark: 1 << 25,
            encoderArgs: ['-af', 'bass=g=20,dynaudnorm=g=101'],
            opusEncoded: true,
            seek: seek
        });

        let dispatcher = this.queue.connection.play(stream, { type: 'opus' })
        .on('finish', () => {
            const song = this.queue.queue.songs.shift();
            this.queue.queue.previousSongs.push(song);
            this.play(query, 0);
        })
        .on('error', (err) => {
            this.client.log(err, 2);
            this.skip();
        })

        if(filter === false) {
            let song = this.queue.queue.songs[0];

            let embed = new MessageEmbed()
            .setTitle(`Now Playing - [${song.duration}]`)
            .setDescription(`[${song.title}](${song.url})`)
            .setFooter(`Requested by ${song.discordAuthor.tag}`, song.discordAuthor.displayAvatarURL())
            .setColor(`RANDOM`)
            .setThumbnail(song.thumbnail)
            .addField('Duration', song.duration, true)
            .addField('Author', song.author, true)
            .addField('Position in queue', this.queue.queue.songs.length - 1, true);
            this.queue.textChannel.send(embed);
        }
    }

    async skip() {
        this.end();
        this.queue.textChannel.send('⏩ Skipped.');
    }

    async end() {
        this.queue.connection.dispatcher.end();
    }
}