"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../base/Event"));
class QueueEndEvent extends Event_1.default {
    constructor(client) {
        super(client, 'queueEnd');
    }
    async run(message, queue) {
        message.channel.send('✅ | Queue ended!');
    }
}
exports.default = QueueEndEvent;
