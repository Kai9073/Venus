import Client from './Client';
import util from 'util';

type TimeFormat = 'mm:ss' | 'hh:mm:ss' | 'dd:hh:mm:ss';

export default class Utils {
    readonly client: Client;
    constructor(client: Client) {
        this.client = client;
    }
    
    cleanText(text: any) {
        if (typeof text !== 'string') text = util.inspect(text, { depth: 1 });
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replace(this.client.token || '', 'N0-T0k3n.f0R_Y0U')
            .replace(process.env.IMDB_API || '', 'N0-4Pi_f0R-U');
        return text;
    }

    msToTime(format: TimeFormat, duration: number) {
        let seconds: string | number = Math.floor((duration / 1000) % 60),
        minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
        hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24),
        days: string | number = Math.floor((duration / (1000 * 60 * 60 * 24)) % 24);
    
        days = (days < 10) ? `0 days` : days;
        hours = (hours < 10) ? `0 hours` : hours;
        minutes = (minutes < 10) ? `0 minutes` : minutes;
        seconds = (seconds < 10) ? `0 seconds` : seconds;
    
        if(format === 'mm:ss') {
            return `${minutes}:${seconds}`;
        } else if (format === 'hh:mm:ss') {
            return `${hours}:${minutes}:${seconds}`;
        } else if (format === 'dd:hh:mm:ss') {
            return `${days}:${hours}:${minutes}:${seconds}`;
        }
    }

    timeToMs(duration: string) {
        let time = duration.split(':');
        
        let days = parseInt(duration[0]) * 86400000;
        let hours = parseInt(duration[1]) * 3600000;
        let minutes = parseInt(duration[2]) * 60000;
        let seconds = parseInt(duration[3]) * 1000;

        return days + hours + minutes + seconds;
    }

    reverse(str: string) {
        return str.split('').reverse().join('');
    }

    toProperCase(str: string) {
        return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    toRandomCase(str: string) {
        let string = str.split('');
        let arr = [];

        for(let char of string) {
            let num = Math.floor(Math.random() * 2);

            if(num === 0) arr.push(char.toLowerCase());
            else if(num === 1) arr.push(char.toUpperCase());
        }
        
        return arr.join('');
    }

    trimArray(arr: string[], maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
    }

    formatBytes(bytes: any, precision: number = 1) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        let units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
        let number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
    }

    isClass(input: any) {
        return typeof input === 'function' && typeof input.prototype === 'object' && input.toString().substring(0, 5) === 'class';
    }
}