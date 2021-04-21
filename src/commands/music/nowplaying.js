const Command = require('command');
const { MessageEmbed } = require('discord.js');

module.exports = class NowPlayingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'np',
            aliases: ['nowplaying'],
            category: 'music',
            description: 'now playing: <insert song name here>',
            usage: 'np'
        });
    }

    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.inlineReply('❌ | There is no queue for this guild.');
        if(!message.member.voice.channel) return message.inlineReply(`❌ | You are not in a voice channel!`);
        if(message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.inlineReply(`❌ | You are currently in the wrong voice channel. Please join <#!${player.queue.voiceChannel.id}>.`);
        let track = this.client.player.nowPlaying(message);

        let embed = new MessageEmbed()
        .setAuthor('Now Playing 🎶')
        .setTitle(track.title)
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .setDescription(`
            \`${this.client.player.createProgressBar(message, { timecodes: true })}\`

            Requested by - ${track.requestedBy}
        `)
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed)
    }
}