module.exports = class Ready {
    constructor(client) {
        this.client = client;
    }

    run() {
        this.client.log('Client - Client has logged in.');
    }
}