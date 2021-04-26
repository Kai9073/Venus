import { Structures } from 'discord.js';

export default class Guild extends Structures.get('Guild') {
    get prefix() {
        return 'v.';
    }
}