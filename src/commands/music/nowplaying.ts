import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class NowPlayingCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'nowplaying',
            aliases: ['np'],
            category: 'music',
            description: 'Now Playing: Rick Astley - Never Gonna Give You Up',
            usage: 'nowplaying',
            minArgs: 0,
            maxArgs: 0
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.reply('❌ | There is no music playing!');
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);

        const track = await this.client.player.nowPlaying(message);

        let embed = new Discord.MessageEmbed()
        .setTitle(track.title)
        .setURL(track.url)
        .setDescription(`${this.client.player.createProgressBar(message, { timecodes: true })}`)
        .setAuthor(track.author)
        .setThumbnail(track.thumbnail)
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}