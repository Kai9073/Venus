import { Message } from 'discord.js';
import Client from '../../base/Client';
import Event from '../../base/Event';

export default class ErrorEvent extends Event {
    constructor(client: Client) {
        super(client, 'error');
    }

    async run(err: string, message: Message) {
        console.log(err);
        switch(err) {
            case 'NotConnected':
                message.channel.send('❌ | You are not connected to a voice channel!');
                break;
            case 'UnableToJoin':
                message.channel.send('❌ | I am unable to join the voice channel!');
                break;
            case 'NotPlaying':
                message.channel.send('❌ | I am not playing anything?');
                break;
            case 'VideoUnavailable':
                message.channel.send('❌ | This video is unvailable <:cri:838668273791926303>');
                break;
            case 'ParseError':
                message.channel.send('❌ | Parsing error... Maybe try again 🤔');
                break;
            default: 
                message.channel.send('❌ | An error occurred...');
        }
    }
}