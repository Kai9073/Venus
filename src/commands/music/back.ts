import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class BackCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'back',
            aliases: [''],
            category: 'music',
            description: 'wait i want that song go back',
            usage: 'back',
            minArgs: 0,
            maxArgs: 0
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.reply('❌ | There is no music playing!');
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);
        if(!player.previousTracks.length) return message.reply('❌ | Uhh, you didn\'t play anything before.');

        const success = await this.client.player.back(message);
        if(success) message.reply('⏪ | Going back.');
    }
}