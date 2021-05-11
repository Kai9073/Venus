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

export default class SkipCommand extends Command {
    private skips: VoteData | null;
    constructor(client: Client) {
        super(client, {
            name: 'skip',
            aliases: ['next'],
            category: 'music',
            description: 'skip song playing',
            usage: 'skip',
            minArgs: 0,
            maxArgs: 0
        });

        this.skips = null;
    }

    async run(message: Discord.Message, args: string[]) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.reply('❌ | There is no music playing!');
        if(message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID) 
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);
        
        await this.skip(message, player);
    }

    async skip(message: Discord.Message, queue: Queue) {
        // @ts-ignore
        if( this.skips === null || this.skips[message.guild?.id as string] === null) {
            // @ts-ignore
            this.skips[message.guild?.id as string] = { voters: [], votes: 0, votesNeeded: 0 };
        }

        // @ts-ignore
        this.skips[message.guild?.id as string].votesNeeded = Math.round(queue.voiceConnection?.channel.members.filter(member => !member.user.bot).size / 2);

        // @ts-ignore
        if(queue.voiceConnection?.channel.members.filter(member => !member.user.bot).size > 2) {
            // @ts-ignore
            if(this.skips[message.guild?.id as string]?.voters.includes(message.author.id)) return message.reply('❌ | You already voted to skip!');
            // @ts-ignore
            this.skips[message.guild?.id as string].votes++;
            // @ts-ignore
            this.skips[message.guild?.id as string].voters.push(message.author.id);

            // @ts-ignore
            if(this.skips[message.guild?.id as string].votes >= this.skips[message.guild?.id as string]?.votesNeeded) {
                // @ts-ignore
                this.skips[message.guild?.id as string] = null;
                const success = await this.client.player.skip(message);
                if(success) message.reply('⏩ | Skipped.');
            } else {
                // @ts-ignore
                message.reply(`✅ | You have voted to skip! (${this.skips[message.guild?.id as string]?.votes} / ${this.skips[message.guild?.id as string]?.votesNeeded})`);
            }
        } else { 
            // @ts-ignore
            this.skips[message.guild?.id as string] = null;
            const success = await this.client.player.skip(message);
            if(success) message.reply('⏩ | Skipped.');
        }
    }
}