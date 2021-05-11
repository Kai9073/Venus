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
        this.skips = null;
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
        // @ts-ignore
        if (this.skips === null || this.skips[message.guild?.id] === null) {
            // @ts-ignore
            this.skips[message.guild?.id] = { voters: [], votes: 0, votesNeeded: 0 };
        }
        // @ts-ignore
        this.skips[message.guild?.id].votesNeeded = Math.round(queue.voiceConnection?.channel.members.filter(member => !member.user.bot).size / 2);
        // @ts-ignore
        if (queue.voiceConnection?.channel.members.filter(member => !member.user.bot).size > 2) {
            // @ts-ignore
            if (this.skips[message.guild?.id]?.voters.includes(message.author.id))
                return message.reply('❌ | You already voted to skip!');
            // @ts-ignore
            this.skips[message.guild?.id].votes++;
            // @ts-ignore
            this.skips[message.guild?.id].voters.push(message.author.id);
            // @ts-ignore
            if (this.skips[message.guild?.id].votes >= this.skips[message.guild?.id]?.votesNeeded) {
                // @ts-ignore
                this.skips[message.guild?.id] = null;
                const success = await this.client.player.skip(message);
                if (success)
                    message.reply('⏩ | Skipped.');
            }
            else {
                // @ts-ignore
                message.reply(`✅ | You have voted to skip! (${this.skips[message.guild?.id]?.votes} / ${this.skips[message.guild?.id]?.votesNeeded})`);
            }
        }
        else {
            // @ts-ignore
            this.skips[message.guild?.id] = null;
            const success = await this.client.player.skip(message);
            if (success)
                message.reply('⏩ | Skipped.');
        }
    }
}
exports.default = SkipCommand;
