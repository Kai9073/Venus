const Discord = require('discord.js');
const Event = require('../../base/classes/Event');

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
}

class Message extends Event {
    constructor() {
        super({
            name: 'message'
        });
    }

    async run(client, message) {
        if(!message.guild) return;
        if(message.author.bot) return;
    
        let prefix = 'v!';
    
        if(!message.content.startsWith(prefix)) return;
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
    
        if(cmd.length === 0) return;
    
        let command = client.commands.get(cmd) ?? client.commands.find(command => command.aliases && command.aliases.includes(cmd));
    
        if(!command) return;
        
        if (!client.cooldown.has(command.name)) {
            client.cooldown.set(command.name, new Discord.Collection());
        }
    
        const now = Date.now();
        const timestamps = client.cooldown.get(command.name);
        const cooldownAmount = command.cooldown || 3000;
    
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) || 0 + cooldownAmount;
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.channel.send(client.sendErrorEmbed(`Please wait ${timeLeft} more second(s) before reusing the \`${command.name}\` command.`));
            }
        }
    
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        
        if(command.authorPermission) {
            let neededPerms = [];
    
            for(let perm of command.authorPermission) {
                if(!message.member.hasPermission(command.authorPermission)) neededPerms.push(permissions[perm]); 
            }

            if(neededPerms.length) return message.channel.send(client.sendErrorEmbed(`You don't have enough permissions. You need \`${neededPerms.join('`, `')}\``));
        } else if(command.clientPermission) {
            let neededPerms = [];
    
            for(let perm of command.clientPermission) {
                if(!message.member.hasPermission(perm)) neededPerms.push(permissions[perm]); 
            }
    
            if(neededPerms.length) return message.channel.send(client.sendErrorEmbed(`You don't have enough permissions. You need \`${neededPerms.join('`, `')}\``));
        }
    
        if(command.devOnly && command.devOnly === true) {
            if(!['561866357218607114', '690822196972486656'].includes(message.author.id)) return message.channel.send(client.sendErrorEmbed(`This command can be used by owners only.`));
        }
    
        if(((command.minimumRequiredArgs !== undefined) && args.length < command.minimumRequiredArgs)) {
            let embed = new Discord.MessageEmbed()
            .setTitle('Invalid Command Usage!')
            .setDescription(`❌ You must input more arguments.`)
            .addField('Usage:', `\`\`\`${command.usage}\`\`\``)
            .setColor('#FF0000')
            return message.channel.send(embed);
        }
        
        if(command) command.run(client, message, args);
    }
}

module.exports = Message;