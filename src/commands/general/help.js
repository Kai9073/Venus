const { MessageEmbed } = require("discord.js");
const Command = require("../../base/classes/Command");
const ms = require("ms");

class HelpCommand extends Command {
    constructor() {
        super({
            name: 'help',
            aliases: ['h', 'commands', 'list'],
            category: 'general',
            description: 'Shows the list of commands and information about the command.',
            usage: 'help [command]'
        });
    
    }

    async run(client, message, args) {
        if(args[0]) {
            let command = client.commands.get(args[0]);
        
            if(!command) return message.channel.send(client.sendErrorEmbed('Unknown Command: ' + args[0]));
        
            let embed = new MessageEmbed()
            .setAuthor(`${client.user?.tag}`, client.user?.displayAvatarURL())
            .setTitle(`**${command.name}**`)
            .setDescription(`${command.description}`)
            .addField(`Category`, `${command.category}`, true)
            .addField(`Usage`, `${command.usage}`, true)
            .addField(`Cooldown`, `${ms(command.cooldown || 3000)}`, true)
            .setFooter(`<> - required | [] - optional`)
            .setColor(`#7289da`);
        
            if(command.aliases) {
                embed.addField(`Aliases`, command.aliases.join(', '));
            }
        
            return message.channel.send(embed);
        } else {
            let commands = client.commands;
        
            let embed = new MessageEmbed()
            .setAuthor(`${client.user?.tag}`, client.user?.displayAvatarURL())
            .setDescription(`Hi, I'm Venus. My prefix in this server is \`i.\`. To find more information about a command, use \`help [command]\`. `)
            //.setDescription(`Venus is a customizable multipurpose bot. It contains a wide-range of commands from fun commands to a music system. Venus is free and easy to use!`)
            .setColor(`#7289da`);
        
            let data = {};
            for(let info of commands.array()) {
                let category = info.category;
                let name = info.name;
                
                // @ts-ignore
                if(!data[category]) {
                    // @ts-ignore
                    data[category] = [];
                }
                
                // @ts-ignore
                data[category].push(name);
            }
        
            for(let [key, value] of Object.entries(data)) {
                let category = key;
        
                let categoryCmds = value.join('`, `');
        
                embed.addField(`${category.toUpperCase()} - [${value.length}]`, `\`${categoryCmds}\``);
            }
        
            message.channel.send(embed);
        }
    }
}

module.exports = HelpCommand;