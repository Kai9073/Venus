class Utils {
    static cleanText(text, client) {
        if (typeof text !== "string") text = require("util").inspect(text, { depth: 1 });
        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(new RegExp(client.token, "g"), "N0-T0k3n.f0R_Y0U")
            .replace(new RegExp(process.env.IMDB_API, "g"), "N0-4Pi_f0R-U");
        return text;
    }

    static msToTime(format, duration) {
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

    static reverse(str) {
        return str.split("").reverse().join("");
    }

    static toProperCase(str) {
        return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    static trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
    }
}

module.exports = Utils;