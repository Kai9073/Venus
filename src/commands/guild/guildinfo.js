const Command = require('command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydney: 'Sydney',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
}

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
}

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
}

const boostTiers = {
    0: 'None',
    1: 'Tier 1',
    2: 'Tier 2',
    3: 'Tier 3'
}

module.exports = class GuildInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'guildinfo',
            aliases: ['gi', 'si', 'serverinfo'],
            category: 'guild',
            description: 'Fetch info from current guild',
            usage: 'guildinfo'
        });
    }

    async run(message, args) {
        let roles = message.guild.roles.cache.map(role => role.toString()).slice(1, -1);

        let embed = new MessageEmbed()
        .setTitle(`${message.guild.name}'s Info`)
        .addField('General', [
            `**❯ Name:** ${message.guild.name}`,
            `**❯ ID:** ${message.guild.id}`,
            `**❯ Owner:** ${message.guild.owner.user.tag} (ID: ${message.guild.ownerID})`,
            `**❯ Region:**  ${regions[message.guild.region]}`,
            `**❯ Explicit Content Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
            `**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
            `**❯ Time Created:** ${moment(message.guild.createdAt).format('LLLL')} (${moment(message.guild.createdAt).fromNow()})`
        ])
        .addField('Channels', [
            `**❯ Total Channels:** ${message.guild.channels.cache.filter(channel => channel.type !== 'category').size.toLocaleString()}`,
            `**❯ Text Channels:** ${message.guild.channels.cache.filter(channel => channel.type === 'text').size.toLocaleString()}`,
            `**❯ Voice Channels:** ${message.guild.channels.cache.filter(channel => channel.type === 'voice').size.toLocaleString()}`,
            `**❯ Categories:** ${message.guild.channels.cache.filter(channel => channel.type === 'category').size.toLocaleString()}`,
            `**❯ Rules Channel:** ${message.guild.rulesChannel?.toString() || 'None'}`,
            `**❯ System Channel:** ${message.guild.systemChannel?.toString() || 'None'}`,
            `**❯ Public Updates Channel:** ${message.guild.publicUpdatesChannel?.toString() || 'None'}`
        ])
        .addField('Boosts', [
            `**❯ Boosts:** ${message.guild.premiumSubscriptionCount || 0}`,
            `**❯ Boost Tier:** ${boostTiers[message.guild.premiumTier]}`
        ])
        .addField('Members', [
            `**❯ Total Members:** ${message.guild.members.cache.size.toLocaleString()}`,
            `**❯ Human Members:** ${message.guild.members.cache.filter(member => !member.user.bot).size.toLocaleString()}`,
            `**❯ Bot Members:** ${message.guild.members.cache.filter(member => member.user.bot).size.toLocaleString()}`,
            `**❯ Status:**`,
            `\u3000**Online:** ${message.guild.members.cache.filter(member => member.presence.status === 'online').size}`,
            `\u3000**Idle:** ${message.guild.members.cache.filter(member => member.presence.status === 'idle').size}`,
            `\u3000**Do Not Disturb:** ${message.guild.members.cache.filter(member => member.presence.status === 'dnd').size}`,
            `\u3000**Offline:** ${message.guild.members.cache.filter(member => member.presence.status === 'offline').size}`
        ])
        .addField('Emojis', [
            `**❯ Total Emojis:** ${message.guild.emojis.cache.size}`,
            `**❯ Non-Animated Emojis:** ${message.guild.emojis.cache.filter(emoji => !emoji.animated).size}`,
            `**❯ Animated Emojis:** ${message.guild.emojis.cache.filter(emoji => emoji.animated).size}`
        ])
        .addField('Others', [
            `**❯ Roles [${roles.length}]:** ${roles.length > 10 ? roles.join(', ') : roles.length < 10 ? this.client.utils.trimArray(roles, 10).join(' ') : 'None'}`
        ])
        .setThumbnail(message.guild.iconURL())
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}