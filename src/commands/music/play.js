const Command = require('command');
const ytsr = require('youtube-sr').default;
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
            maxArgs: -1
        });
    }

    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        let voiceChannel = message.member.voice.channel;
        if (!player) {
            if(!message.member.voice.channel) return message.inlineReply(`❌ | Please join a voice channel!`);
        } else {
            if(voiceChannel.id !== player.firstMessage.member.voice.channel.id) return message.inlineReply(`❌ | You are currently in the wrong voice channel. Please join the ${player.queue.voiceChannel.name}`);
        }

        if(voiceChannel.full && !player) return message.inlineReply(`❌ | I can't join the voice channel, it's full!`);
        if(!voiceChannel.joinable && !player) return message.inlineReply(`❌ | I can't join the voice channel!`);
        if(!voiceChannel.speakable && !player) return message.inlineReply(`❌ | I can't speak in the voice channel!`);
        if(!args.length) return message.inlineReply(`❌ | Please provide a query.`);

        this.client.player.play(message, args.join(' '), true);
    }
}