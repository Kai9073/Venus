const Discord = require('discord.js');

class Command {
    constructor(client, ops) {
        if(!ops.name || !ops.aliases || !ops.category || !ops.description || !ops.usage) throw new Error(`Command doesn't have the important properties!`);
        this.name = ops.name;
        this.aliases = ops.aliases;
        this.category = ops.category;
        this.description = ops.description;
        this.cooldown = ops.cooldown;
        this.usage = ops.usage;
        this.devOnly = ops.devOnly;
        this.clientPermission = ops.clientPermission;
        this.authorPermission = ops.authorPermission;
        this.testOnly = ops.testOnly;
        this.requiredArgs = ops.requiredArgs;
    }

    run(client, message, args) {
        throw new Error(`Command ${this.name} doesn't have a run method!`);
    }
}

module.exports = Command;