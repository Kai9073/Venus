"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Message extends discord_js_1.Structures.get('Message') {
    async resolveUser(name, multiple = false) {
        if (name.match(/[A-Za-z0-9]/)) {
            let username = name.toLowerCase();
            const arr = [];
            this.guild?.members.cache.forEach(user => {
                if (user.user.username.toLowerCase().startsWith(username))
                    arr.push(user.user);
            });
            return multiple ? arr : arr[0];
        }
        else
            return null;
    }
}
discord_js_1.Structures.extend('Message', () => Message);
