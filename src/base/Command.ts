import { Message, PermissionString } from "discord.js";
import Client from "./Client";

interface CommandOps {
    name: string;
    aliases: string[];
    category: string;
    description: string;
    usage: string;
    cooldown?: number;
    minArgs?: number;
    maxArgs?: number;
    devOnly?: boolean;
    authorPermission?: PermissionString[];
    clientPermission?: PermissionString[];
}

export default class Command {
    readonly client: Client;
    readonly name: string;
    readonly aliases: string[];
    readonly category: string;
    readonly description: string;
    readonly usage: string;
    readonly cooldown?: number;
    readonly minArgs?: number;
    readonly maxArgs?: number;
    readonly devOnly?: boolean;
    readonly authorPermission?: PermissionString[];
    readonly clientPermission?: PermissionString[];
    constructor(client: Client, ops: CommandOps) {
        this.client = client;
        this.name = ops.name;
        this.aliases = ops.aliases;
        this.category = ops.category;
        this.description = ops.description;
        this.usage = ops.usage;
        this.cooldown = ops.cooldown;
        this.minArgs = ops.minArgs;
        this.maxArgs = ops.maxArgs;
        this.devOnly = ops.devOnly;
        this.authorPermission = ops.authorPermission;
        this.clientPermission = ops.clientPermission;
    }

    async run(message: Message, args: string[]) {
        throw new Error(`${this.name} doesn't have a run method.`);
    }
}