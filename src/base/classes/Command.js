class Command {
    constructor(ops) {
        this.name = ops.name;
        this.aliases = ops.aliases;
        this.category = ops.category;
        this.description = ops.description;
        this.usage = ops.usage;
        this.minimumRequiredArgs = ops.minimumRequiredArgs;
        this.devOnly = ops.devOnly;
        this.cooldown = ops.cooldown;
        this.authorPermission = ops.authorPermission;
        this.clientPermission = ops.clientPermission;
    }

    run(client, message, args) {
        throw new Error(`The ${this.name} command doesn't have a run method!`);
    }
}

module.exports = Command;