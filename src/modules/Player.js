const ytdl = require('discord-ytdl-core');
const ytsr = require('youtube-sr');

module.exports = class Player {
    constructor(client, textChannel, voiceChannel, guild) {
        this.client = client;

        this.queue = {
            guild: guild,
            textChannel: textChannel,
            voiceChannel: voiceChannel,
            connection: null,
            queue: {
                songs: []
            },
            data: {
                paused: false
            },
            volume: 75
        }
    }
}