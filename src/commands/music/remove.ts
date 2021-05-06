import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';

export default class RemoveCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'remove',
            aliases: [],
            category: 'music',
            description: 'wait dont remove me pl-',
            usage: 'remove <number>',
            minArgs: 1,
            maxArgs: 1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.reply('❌ | There is no music playing!');
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);

        if(isNaN(parseInt(args[0]))) return message.reply('❌ | Please provide a valid track number!');
        const track = await this.client.player.remove(message, parseInt(args[0]));
        message.reply(`⏸ | Removed track - ${track.title}.`);
    }
}