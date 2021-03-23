class Event {
    constructor(ops) {
        this.name = ops.name;
    }

    async run(...args) {
        throw new Error(`The ${this.name} event doesn't have a run method!`);
    }
}

module.exports = Event;