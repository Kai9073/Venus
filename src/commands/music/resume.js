const Command = require('command');

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            aliases: ['continue', 'go'],
            category: 'music',
            description: '-ok im back',
            usage: 'resume'
        });
    }

    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.inlineReply('❌ | There is no queue for this guild.');
        if(!message.member.voice.channel) return message.inlineReply(`❌ | You are not in a voice channel!`);
        if(message.member.voice.channel.id !== player.firstMessage.member.voice.channel.id) return message.inlineReply(`❌ | You are currently in the wrong voice channel. Please join <#!${player.queue.voiceChannel.id}>.`);
        let success = this.client.player.resume(message);
        if(success) message.inlineReply('▶ | Resumed.');
    }
}