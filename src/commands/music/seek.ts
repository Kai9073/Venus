import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class SeekCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'seek',
            aliases: ['fastforward'],
            category: 'music',
            description: 'never gonna- we known each other for so long...',
            usage: 'seek <time>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.reply('❌ | There is no music playing!');
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);

        let seek = this.client.utils.timeToMs(args.join(' '));
        if(typeof seek !== 'number' || seek === null) return message.reply('❌ | Wrong format/input! Example: `00:55`, `50`');
        await this.client.player.seek(message, seek);
        message.reply(`⏩ | Set position to ${this.client.utils.msToTime('hh:mm:ss', seek)}.`);
    }
}