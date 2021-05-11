import Command from '../../base/Command';
import Discord from 'discord.js';
import Client from '../../base/Client';
import { Queue } from 'discord-player';

interface VoteData {
    [ID: string]: {
        votes: number;
        voters: Discord.Snowflake[];
        votesNeeded: number;
    }
}

export default class SkipToCommand extends Command {
    private skips: VoteData | null;
    constructor(client: Client) {
        super(client, {
            name: 'skipto',
            aliases: ['jumpto', 'jump'],
            category: 'music',
            description: 'skip to track in queue',
            usage: 'skipto <track number>',
            minArgs: 0,
            maxArgs: 1
        });

        this.skips = null;
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.reply('❌ | There is no music playing!');
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);
        
        if(isNaN(parseInt(args[0]))) return message.reply('❌ | Please provide a valid track number!');
        const success = await this.client.player.jump(message, parseInt(args[0]));
        if(success) message.reply(`⏩ | Skipped to ${player.tracks[parseInt(args[0])].title}.`);
    }
}