"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../base/Event"));
class PlaylistParseStartEvent extends Event_1.default {
    constructor(client) {
        super(client, 'playlistParseStart');
    }
    async run(playlist, message) {
        message.channel.send('<a:loading:803081781707407361> | Parsing playlist... This may take a few a few minutes or seconds...');
    }
}
exports.default = PlaylistParseStartEvent;
