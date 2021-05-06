"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../base/Event"));
class QueueCreateEvent extends Event_1.default {
    constructor(client) {
        super(client, 'queueCreate');
    }
    async run(message, queue) {
        message.channel.send('✅ | Created queue!');
    }
}
exports.default = QueueCreateEvent;
