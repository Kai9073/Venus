import Command from '../../base/Command';
import Discord, { MessageEmbed, version } from 'discord.js';
import moment from 'moment';
import ms from 'pretty-ms';
import os from 'os';
import Client from '../../base/Client';

export default class BotInfoCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'botinfo',
            aliases: ['venusinfo', 'bi'],
            category: 'guild',
            description: 'Venus\'s info',
            usage: 'botinfo'
        });
    }

    async run(message: Discord.Message, args: string[]) {
        let embed = new MessageEmbed()
        .setTitle(`${this.client.user?.tag}'s Info`)
        .addField('General', [
            `**❯ Name:** ${this.client.user?.username}`,
            `**❯ Discriminator:** ${this.client.user?.discriminator}`,
            `**❯ ID:** ${this.client.user?.id}`,
            `**❯ Commands:** ${this.client.commands.size.toLocaleString()}`,
            `**❯ Servers:** ${this.client.guilds.cache.size.toLocaleString()}`,
            `**❯ Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
            `**❯ Users:** ${this.client.users.cache.size.toLocaleString()}`,
            `**❯ Created at:** ${moment(this.client.user?.createdAt).format('LLLL')} (${moment(this.client.user?.createdAt).fromNow()})`
        ])
        .addField('System', [
            `**❯ Node.js Version:** ${process.version}`,
            `**❯ Discord.js Version:** v${version}`,
            `**❯ Version:** v${process.env.VERSION}`,
            `**❯ Platform:** ${process.platform}`,
            `**❯ Uptime:** ${ms(process.uptime() * 1000, { compact: true })}`,
            `**❯ CPU:**`,
            `\u3000**Cores:** ${os.cpus().length}`,
            `\u3000**Model:** ${os.cpus()[0].model}`,
            `\u3000**Speed:** ${os.cpus()[0].speed}MHz`,
            `**❯ Memory:**`,
            `\u3000**Total:** ${this.client.utils.formatBytes(process.memoryUsage().heapTotal)}`,
            `\u3000**Used:** ${this.client.utils.formatBytes(process.memoryUsage().heapUsed)}`,
            `\u3000**RSS:** ${this.client.utils.formatBytes(process.memoryUsage().rss)}`
        ])
        // @ts-ignore
        .setThumbnail(this.client.user?.displayAvatarURL())
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.reply(embed)

    }
}