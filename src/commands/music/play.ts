import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class PlayCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            category: 'music',
            description: 'Play music',
            usage: 'play <query>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);

        if(!args.length) message.channel.send('❌ | Please provide a query!');

        await this.client.player.play(message, args.join(' '), true);
    }
}