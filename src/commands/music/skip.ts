import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class SkipCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'skip',
            aliases: ['next', 'nextone'],
            category: 'music',
            description: 'skip song playing',
            usage: 'skip',
            minArgs: 0,
            maxArgs: 0
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.reply('❌ | There is no music playing!');
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);

        const success = await this.client.player.skip(message);
        if(success) message.reply('⏩ | Skipped.');
    }
}