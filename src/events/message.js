const Discord = require('discord.js');

const permissions = {
    ADMINISTRATOR: 'Administrator',
    CREATE_INSTANT_INVITE: 'Create Instant Invite',
    KICK_MEMBERS: 'Kick Members',
    BAN_MEMBERS: 'Ban Members',
    MANAGE_CHANNELS: 'Manage Channels',
    MANAGE_GUILD: 'Manage Guild',
    ADD_REACTIONS: 'Add Reactions',
    VIEW_AUDIT_LOG: 'View Audit Log',
    PRIORITY_SPEAKER: 'Priority Speaker',
    STREAM: 'Stream',
    VIEW_CHANNEL: 'View Channel',
    SEND_MESSAGES: 'Send Messages',
    SEND_TTS_MESSAGES: 'Send TTS Messages',
    MANAGE_MESSAGES: 'Manage Messages',
    EMBED_LINKS: 'Embed Links',
    ATTACH_FILES: 'Attach Files',
    READ_MESSAGE_HISTORY: 'Read Message History',
    MENTION_EVERYONE: 'Mention Everyone',
    USE_EXTERNAL_EMOJIS: 'Use External Emojis',
    VIEW_GUILD_INSIGHTS: 'View Guild Insights',
    CONNECT: 'Connect',
    SPEAK: 'Speak',
    MUTE_MEMBERS: 'Mute Members',
    DEAFEN_MEMBERS: 'Deafen Members',
    MOVE_MEMBERS: 'Move Members',
    USE_VAD: 'Use VAD (Voice Activity Detection)',
    CHANGE_NICKNAME: 'Change Nickname',
    MANAGE_NICKNAMES: 'Manage Nicknames',
    MANAGE_ROLES: 'Manage Roles',
    MANAGE_WEBHOOKS: 'Manage Webhooks',
    MANAGE_EMOJIS: 'Manage Emojis'
};

module.exports = class Message {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if(!message.guild) return;
        if(message.author.bot) return;
    
        let prefix = 'v.';

        if(!message.content.startsWith(prefix)) return;
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if(cmd.length === 0) return;

        let command = this.client.commands.get(cmd) || this.client.commands.find(command => command.aliases && command.aliases.includes(cmd));

        if(!command) return;

        /* COOLDOWN */
        if (!this.client.cooldown.has(command.name)) {
		    this.client.cooldown.set(command.name, new Discord.Collection());
	    }

	    const now = Date.now();
	    const timestamps = this.client.cooldown.get(command.name);
	    const cooldownAmount = command.cooldown || 3000;

	    if (timestamps.has(message.author.id)) {
		    const expirationTime = timestamps.get(message.author.id) || 0 + cooldownAmount;

		    if (now < expirationTime) {
			    const timeLeft = (expirationTime - now) / 1000;
			    return message.channel.send(`Please wait ${timeLeft} more second(s) before reusing the \`${command.name}\` command.`);
		    }
	    }

	    timestamps.set(message.author.id, now);
	    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        
        /* PERMISSIONS */
        
        if(command.authorPermission && command.authorPermission === true) {
            let neededPerms = [];

            command.authorPermission.forEach((perm) => {
                if(!message.member.hasPermission(perm)) neededPerms.push(permissions[perm]);
            });

            if(neededPerms.length) return message.channel.send(`:x: You don't have enough permissions. You need ${neededPerms} permissions to run the ${command.name} command.`);
        } else if(command.clientPermission && command.clientPermission === true) {
            let neededPerms = [];

            command.clientPermission.forEach((perm) => {
                if(!message.guild.me.hasPermission(perm)) neededPerms.push(permissions[perm]);
            });

            if(neededPerms.length) message.channel.send(`:x: I don't have enough permissions. I need ${neededPerms} permissions to run the ${command.name} command.`);
        }

        /* Owner Only */

        if(command.devOnly && command.devOnly === true) {
            if(!['561866357218607114', '690822196972486656'].includes(message.author.id)) return message.channel.send(`:x: You can't use this command.`);
        }

        if(command.testOnly && command.testOnly === true) {
            if(message.guild.id !== '744036166734708817') return message.channel.send(`:x: You can't use this command.`);
        }

        if(((command.requiredArgs !== undefined) && args.length < command.requiredArgs)) {
            let embed = new Discord.MessageEmbed()
            .setTitle('Invalid Command Usage!')
            .setDescription(`<:error:811066653042278420> You must input more arguments.`)
            .addField('Usage:', `\`\`\`${command.usage}\`\`\``)
            .setColor('RED')
            return message.channel.send(embed);
        }
        
        if(command) command.run(this.client, message, args);
    }
}