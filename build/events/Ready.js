"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../base/Event"));
class Ready extends Event_1.default {
    constructor(client) {
        super(client, 'ready');
    }
    async run() {
        this.client.log(`Client has logged in!`, 0);
    }
}
exports.default = Ready;
