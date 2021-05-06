import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class StopCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'stop',
            aliases: ['leave', 'stfu', 'shutup', 'getout', 'gtfo'],
            category: 'music',
            description: 'thanks for listening',
            usage: 'stop',
            minArgs: 0,
            maxArgs: 0
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.reply('❌ | There is no music playing!');
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);

        const success = await this.client.player.stop(message);
        if(success) message.reply('⏹ | Stopped.');
    }
}