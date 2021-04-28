import { Structures, User } from 'discord.js';

class Message extends Structures.get('Message') {
    async resolveUser(name: string, multiple = false): Promise<User | User[] | null> {
        if(name.match(/[A-Za-z0-9]/)) {
            let username = name.toLowerCase();
            const arr: User[] = [];
            this.guild?.members.cache.forEach(user => {
                if(user.user.username.toLowerCase().startsWith(username)) arr.push(user.user);
            });
            return multiple ? arr : arr[0];
        } else return null;
    }
}

Structures.extend('Message', () => Message);