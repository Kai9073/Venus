import { Structures, APIMessage, User } from 'discord.js';

class Message extends Structures.get('Message') {
    async resolveUser(name: string, multiple = false) {
        let username = name.toLowerCase();
        const arr: User[] = [];
        this.guild?.members.cache.forEach(user => {
            if(user.user.username.toLowerCase().startsWith(username)) arr.push(user.user);
        });
        return multiple ? arr : arr[0];
    }
}

Structures.extend('Message', () => Message);