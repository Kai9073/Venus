class Utils {
    constructor(client) {
        this.client = client;
    }
    
    cleanText(text) {
        if (typeof text !== "string") text = require("util").inspect(text, { depth: 1 });
        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(new RegExp(this.client.token, "g"), "N0-T0k3n.f0R_Y0U")
            .replace(new RegExp(process.env.IMDB_API, "g"), "N0-4Pi_f0R-U");
        return text;
    }

    msToTime(format, duration) {
        let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
        days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 24);
    
        days = (days < 10) ? 0 + days : days;
        hours = (hours < 10) ? 0 + hours : hours;
        minutes = (minutes < 10) ? 0 + minutes : minutes;
        seconds = (seconds < 10) ? 0 + seconds : seconds;
    
        if(format === "mm:ss") {
            return `${minutes}:${seconds}`;
        } else if (format === "hh:mm:ss") {
            return `${hours}:${minutes}:${seconds}`;
        } else if (format === "dd:hh:mm:ss") {
            return `${days}:${hours}:${minutes}:${seconds}`;
        }
    }

    reverse(str) {
        return str.split("").reverse().join("");
    }

    toProperCase(str) {
        return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
    }

    formatBytes(bytes, precision) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;
        let units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
        let number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
    }
}

module.exports = Utils;