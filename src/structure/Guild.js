const { Structures } = require('discord.js');

class Guild extends Structures.get('Guild') {
    get prefix() {
        return 'v.';
    }
}

Structures.extend('Guild', () => Guild);