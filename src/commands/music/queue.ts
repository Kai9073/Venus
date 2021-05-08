import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class QueueCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'queue',
            aliases: ['songlist'],
            category: 'music',
            description: 'Queued 10 songs...',
            usage: 'queue',
            minArgs: 0,
            maxArgs: 0
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.reply('❌ | There is no music playing!');
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);

        let embed = new Discord.MessageEmbed()
        .setTitle(`Queue for ${message.guild?.name}`)
        .setDescription(`**Now Playing: [${player.playing.title}](${player.playing.url})**\n
        ${player.tracks.map((track, i) => {
            return `${i}. [${track.title}](${track.url}) - ${track.requestedBy.toString()}`
        }).slice(1, 10).join('\n') + `\n\n${player.tracks.length > 10 ? `and ${player.tracks.length - 10} other songs...` : ``}`}`)
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed);
    }
}