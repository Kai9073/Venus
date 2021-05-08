"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
class SkipCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'skip',
            aliases: ['next'],
            category: 'music',
            description: 'skip song playing',
            usage: 'skip',
            minArgs: 0,
            maxArgs: 0
        });
    }
    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if (!player)
            return message.reply('❌ | There is no music playing!');
        if (message.guild?.me?.voice.channel && message.guild?.me?.voice.channelID !== message.member?.voice.channelID)
            return message.reply(`❌ | You are currently in the wrong voice channel. Please join ${player.voiceConnection?.channel.toString()}!`);
        await this.skip(message, player);
    }
    async skip(message, queue) {
        let voteData = {
            votes: 0,
            voters: [],
            votesNeeded: 0
        };
        // @ts-ignore
        voteData.votesNeeded = Math.round(queue.voiceConnection?.channel.members.filter(member => !member.user.bot).size / 2);
        // @ts-ignore
        if (queue.voiceConnection?.channel.members.size > 2) {
            if (voteData.voters.includes(message.author.id))
                return message.reply('❌ | You already voted to skip!');
            voteData.votes++;
            voteData.voters.push(message.author.id);
            if (voteData.votes >= voteData.votesNeeded) {
                voteData = { votes: 0, voters: [], votesNeeded: 0 };
                const success = await this.client.player.skip(message);
                if (success)
                    message.reply('⏩ | Skipped.');
            }
            else {
                message.reply(`✅ | You have voted to skip! (${voteData.votes} / ${voteData.votesNeeded})`);
            }
        }
        else {
            voteData = { votes: 0, voters: [], votesNeeded: 0 };
            const success = await this.client.player.skip(message);
            if (success)
                message.reply('⏩ | Skipped.');
        }
    }
}
exports.default = SkipCommand;
