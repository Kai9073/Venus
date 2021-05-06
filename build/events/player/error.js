"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../base/Event"));
class ErrorEvent extends Event_1.default {
    constructor(client) {
        super(client, 'error');
    }
    async run(err, message) {
        console.log(err);
        switch (err) {
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
exports.default = ErrorEvent;
