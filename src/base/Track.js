module.exports = class Track {
    constructor(ops) {
        this.title = ops.title;
        this.url = ops.url;
        this.author = ops.author;
        this.duration = ops.duration;
        this.durationMS = ops.durationMS;
        this.discordAuthor = ops.discordAuthor;
        this.thumbnail = ops.thumbnail;
        this.type = ops.type;
        this.album = ops.album; 
    }
}