const fetch = require("node-fetch");
const Command = require("../../base/classes/Command");
const { MessageEmbed } = require("discord.js");

class NPMCommand extends Command {
    constructor() {
        super({
            name: 'npm',
            aliases: ['npmjs'],
            category: 'search',
            description: 'Returns information of the mentioned NPM Package.',
            usage: 'npm <pkg>',
            minimumRequiredArgs: 1
        });
    }
    
    async run(client, message, args) {
        let data = await fetch(`https://registry.npmjs.com/${encodeURIComponent(args[0])}`);
        data = await data.json();

        if(!data.name) return message.channel.send(client.sendErrorEmbed(`Can't find package: ${args[0]}`));

        let name = data.name;
        let url = `https://npmjs.com/package/${name}`;
        let version = data['dist-tags'].latest;
        let description = data.versions[version].description;
        let license = data.versions[version].license;
        let dependencies = Object.keys(data.versions[version].dependencies);
        let author = data.versions[version]['author'].name;
        let keywords = data.versions[version].keywords;
        let main = data.versions[version].main;
        let maintainers = data.versions[version].maintainers.map((maintainer) => maintainer.name);
        let repository = data.versions[version].repository.url;
        let runkit = `https://npm.runkit.com/${name}`;
        let banner = `https://nodei.co/npm/${name}.png`;
        
        if(repository.includes('git+')) repository = repository.replace('git+', 'https://');
        if(repository.includes('.git')) repository = repository.replace('.git', '');
        if(repository.includes('git://')) repository = repository.replace('git:', 'https:');

        let embed = new MessageEmbed()
        .setAuthor('NPM Package Information', 'https://i.imgur.com/8DKwbhj.png/', 'https://npmjs.com/')
        .setTitle(name)
        .setURL(url)
        .setDescription(description)
        .addField('Version', version, true)
        .addField('Author', author, true)
        .addField('Main File', main, true)
        .addField('License', license, true)
        .addField('Dependencies', dependencies.length < 10 ? dependencies.join(', ') : dependencies.length > 10 ? client.utils.trimArray(dependencies).join(', ') : 'None', true)
        .addField('Maintainers', maintainers.length < 10 ? maintainers.join(', ') : maintainers.length > 10 ? client.utils.trimArray(maintainers).join(', ') : 'None', true)
        .addField('Repository', repository)
        .addField('Runkit', runkit)
        .setImage(banner)
        .setColor('RANDOM')
        .setThumbnail('https://i.imgur.com/8DKwbhj.png/')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}

module.exports = NPMCommand;