"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
class Utils {
    constructor(client) {
        this.client = client;
    }
    cleanText(text) {
        if (typeof text !== 'string')
            text = util_1.default.inspect(text, { depth: 1 });
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replace(this.client.token || '', 'N0-T0k3n.f0R_Y0U')
            .replace(process.env.IMDB_API || '', 'N0-4Pi_f0R-U');
        return text;
    }
    msToTime(duration) {
        let seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor((duration / (1000 * 60 * 60)) % 24), days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 24);
        days = (days < 10) ? `0${days}` : days;
        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;
        return `${days !== '00' ? `${days}:` : ''}${hours !== '00' || days !== '00' ? `${hours}:` : ''}${minutes}:${seconds}`;
    }
    timeToMs(duration) {
        let time = duration.split(':').reverse();
        let days = parseInt(time[3]) * 86400000 || null;
        let hours = parseInt(time[2]) * 3600000 || null;
        let minutes = parseInt(time[1]) * 60000 || null;
        let seconds = parseInt(time[0]) * 1000 || null;
        // @ts-ignore
        return days + hours + minutes + seconds || null;
    }
    reverse(str) {
        return str.split('').reverse().join('');
    }
    toProperCase(str) {
        return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    toRandomCase(str) {
        let string = str.split('');
        let arr = [];
        for (let char of string) {
            let num = Math.floor(Math.random() * 2);
            if (num === 0)
                arr.push(char.toLowerCase());
            else if (num === 1)
                arr.push(char.toUpperCase());
        }
        return arr.join('');
    }
    trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }
    formatBytes(bytes, precision = 1) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes))
            return '-';
        let units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
        let number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    }
    isClass(input) {
        return typeof input === 'function' && typeof input.prototype === 'object' && input.toString().substring(0, 5) === 'class';
    }
}
exports.default = Utils;
