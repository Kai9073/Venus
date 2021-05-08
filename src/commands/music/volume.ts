import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class VolumeCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'volume',
            aliases: [],
            category: 'music',
            description: 'never gONNA🔊GIVE🔊YOU🔊UP',
            usage: 'volume <1-100>',
            minArgs: 0,
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.reply('❌ | There is no music playing!');
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);

        if(!args.length) return message.reply(`🔊 | Volume: ${player.volume}%`);

        if(isNaN(parseInt(args[0]))) return message.reply('❌ | Please provide a valid number!');
        if((parseInt(args[0]) > 100) || (parseInt(args[0]) < 1)) return message.reply('❌ | Volume must be from 1-100%!');
        const success = await this.client.player.setVolume(message, parseInt(args[0]));
        if(success) message.reply(`✅ | Volume set to ${args[0]}%!`);
    }
}