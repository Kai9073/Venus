"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../base/Command"));
const discord_js_1 = require("discord.js");
const moment_1 = __importDefault(require("moment"));
const badges = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
const statuses = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline'
};
class UserInfoCommand extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            aliases: ['ui', 'whois'],
            category: 'guild',
            description: 'Fetch info from user',
            usage: 'userinfo [member]'
        });
    }
    async run(message, args) {
        // @ts-ignore
        let user = message.mentions.users.first() || this.client.users.cache.get(args[0]) /*|| await message.resolveUser(args.join(' '))*/ || message.author;
        if (!args.length)
            user = message.author;
        if (!user || user === undefined || user === null)
            return message.reply(`❌ | User doesn't exist.`);
        let guildUser = message.guild?.members.cache.get(user.id);
        let flags = user.flags ? user.flags.toArray() : null;
        let roles = guildUser?.roles.cache.map(role => role.toString()).slice(0, -1);
        let embed = new discord_js_1.MessageEmbed()
            .setTitle(`${user.tag}'s Info`)
            .addField('General', [
            `**❯ Username:** ${user.username}`,
            `**❯ Discriminator:** ${user.discriminator}`,
            `**❯ ID:** ${user.id}`,
            // @ts-ignore
            `**❯ Flags:** ${flags ? flags.map((flag) => badges[flag]).join(', ') : 'None'}`,
            `**❯ Time Created:** ${moment_1.default(user.createdAt).format('LLLL')} (${moment_1.default(user.createdAt).fromNow()})`,
            // @ts-ignore
            `**❯ Status:** ${statuses[user.presence.status]}`
        ])
            .addField('Guild', [
            `**❯ Joined At:** ${moment_1.default(guildUser?.joinedAt).format('LLLL')} (${moment_1.default(guildUser?.joinedAt).fromNow()})`,
            `**❯ Highest Role:** ${guildUser?.roles.highest.id === message.guild?.id ? 'None' : guildUser?.roles.highest.name}`,
            `**❯ Hoist Role:** ${guildUser?.roles.hoist ? guildUser?.roles.hoist.name : 'None'}`,
            // @ts-ignore
            `**❯ Roles [${roles?.length || 0}]:** ${roles?.length < 10 ? roles?.join(', ') : roles?.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
        ])
            // @ts-ignore
            .setColor(guildUser?.displayHexColor)
            .setThumbnail(user.displayAvatarURL())
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.reply(embed);
    }
}
exports.default = UserInfoCommand;
