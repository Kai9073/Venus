import Client from "./Client";

export default class Event {
    readonly client: Client;
    readonly name: string;
    constructor(client: Client, name: string) {
        this.client = client;
        this.name = name;
    }

    async run(...args: any) {
        throw new Error(`${this.name} doesn't have a run method.`);
    }
}