const Command = require('command');

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            aliases: ['next'],
            category: 'music',
            description: 'next.',
            usage: 'skip'
        });
    }

    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.inlineReply('❌ | There is no queue for this guild.');
        if(!message.member.voice.channel) return message.inlineReply(`❌ | You are not in a voice channel!`);
        if(message.member.voice.channel.id !== player.firstMessage.member.voice.channel.id) return message.inlineReply(`❌ | You are currently in the wrong voice channel. Please join <#!${player.queue.voiceChannel.id}>.`);
        let success = this.client.player.pause(message);
        if(success) message.inlineReply('⏩ | Skipped.');
    }
}