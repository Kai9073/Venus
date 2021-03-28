const fetch = require("node-fetch");
const Command = require("../../base/classes/Command");

class DJSCommand extends Command {
    constructor() {
        super({
            name: 'djs',
            aliases: ['discordjs', 'discord.js', 'djsdocs'],
            category: 'search',
            description: 'Search through the documentation of discord.js.',
            usage: 'djs <search>',
            minimumRequiredArgs: 1
        });
    }

    async run(client, message, args) {
        let data = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(' '))}`);
        data = await data.json();

        if(data) {
            message.inlineReply({ embed: data });
        } else {
            message.inlineReply(client.sendErrorEmbed(`Can't find that documentation!`));
        }
    }
}

module.exports = DJSCommand;