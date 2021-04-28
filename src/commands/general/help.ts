import Command from '../../base/Command';
import Discord, { MessageEmbed } from 'discord.js';
import Client from '../../base/Client';

export default class HelpCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'help',
            aliases: ['h', 'cmdlist', 'list'],
            category: 'general',
            description: 'Returns a list of commands :pog:',
            usage: 'help [command]'
        });
    }

    async run(message: Discord.Message, args: string[]) {
        if(args.length) {
            const command = this.client.commands.get(args[0]) ?? this.client.commands.find(command => command.aliases && command.aliases.includes(args[0]));

            if(!command) return message.reply(`❌ | Command not found.`);

            let embed = new MessageEmbed()
            .setAuthor(this.client.user?.tag, this.client.user?.displayAvatarURL())
            .setTitle(command.name)
            .setDescription(command.description)
            .addField('Aliases', `\`${command.aliases.join('`, `') || 'None'}\``, true)
            .addField('Category', this.client.utils.toProperCase(command.category), true)
            // @ts-ignore
            .addField('Usage', `${command.usage}`, true)
            .addField('Cooldown', `${command.cooldown || '3s'}`, true)
            .addField('Dev Only?', `${command.devOnly === true ? 'Yes' : 'No'}`, true)
            // .addField('Permissions Required (Author)', `\`${command.authorPermission.join('`, `') ?? 'None'}\``)
            // .addField('Permissions Required (Client)', `\`${command.clientPermission.join('`, `') ?? 'None'}\``)
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.reply(embed);
        } else {
            const commands = this.client.commands;

            let embed = new MessageEmbed()
            .setTitle('Help Panel')
            // @ts-ignore
            .setDescription(`Hi, I'm Venus. The prefix for this server is \`${message.guild.prefix}\`. To find more information about a command, use \`${message.guild.prefix}help [command]\`.`)
            .setColor('RANDOM')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

            let obj: any = {};

            for(let command of commands.array()) {
                let category = this.client.utils.toProperCase(command.category) || 'Unknown';
                let name = command.name;

                if(!obj[category]) {
                    obj[category] = [];
                }

                obj[category].push(name);
            }

            for(let [key, value] of Object.entries(obj)) {
                let category = key;
                
                let categoryCmds = `\`${(value as string[]).join('`, `')}\``;

                embed.addField(`${category} Commands - [${(value as string[]).length}]`, categoryCmds);
            }

            message.reply(embed);
        }
    }
}