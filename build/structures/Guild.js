"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Guild extends discord_js_1.Structures.get('Guild') {
    get prefix() {
        return 'v.';
    }
}
exports.default = Guild;
