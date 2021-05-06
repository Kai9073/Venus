"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../base/Event"));
class NoResultsEvent extends Event_1.default {
    constructor(client) {
        super(client, 'noResults');
    }
    async run(message, query) {
        message.channel.send(`❌ | No results found...`);
    }
}
exports.default = NoResultsEvent;
