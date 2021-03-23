const path = require('path');
const Canvas = require('canvas');
const fetch = require('node-fetch');
const GIFEncoder = require('gifencoder');

class ImageGen {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    static async affect(avatar) {
        // eslint-disable-next-line no-undef
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'affect.png'));
        const img = await Canvas.loadImage(avatar);

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 180, 385, 200, 153);

        return canvas.toBuffer();
    }

    static async changemymind(text) {
        // eslint-disable-next-line no-undef
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'changemymind.jpg'));

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        let x = text.length;
        let fontSize = 70;
        if (x <= 15) {
            ctx.translate(310, 365);
        } else if (x <= 30) {
            fontSize = 50;
            ctx.translate(315, 365);
        } else if (x <= 70) {
            fontSize = 40;
            ctx.translate(315, 365);
        } else if (x <= 85) {
            fontSize = 32;
            ctx.translate(315, 365);
        } else if (x < 100) {
            fontSize = 26;
            ctx.translate(315, 365);
        } else if (x < 120) {
            fontSize = 21;
            ctx.translate(315, 365);
        } else if (x < 180) {
            fontSize = 0.0032 * (x * x) - 0.878 * x + 80.545;
            ctx.translate(315, 365);
        } else if (x < 700) {
            fontSize = 0.0000168 * (x * x) - 0.0319 * x + 23.62;
            ctx.translate(310, 338);
        } else {
            fontSize = 7;
            ctx.translate(310, 335);
        }
        ctx.font = `${fontSize}px Arial`;
        ctx.rotate(-0.39575);

        const lines = this._getLines({ text, ctx, maxWidth: 345 });
        let i = 0;
        do {
            ctx.fillText(lines[i], 10, i * fontSize - 5);
            i++;
        } while (i < lines.length)

        return canvas.toBuffer();
    }

    static _getLines(ops) {
        if (!ops.text) return [];
        const lines = [];

        while (ops.text.length) {
            let i;
            for (i = ops.text.length; ops.ctx.measureText(ops.text.substr(0, i)).width > ops.maxWidth; i -= 1);
            const result = ops.text.substr(0, i);
            let j;
            if (i !== ops.text.length) for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);
            lines.push(result.substr(0, j || result.length));
            ops.text = ops.text.substr(lines[lines.length - 1].length, ops.text.length);
        }

        return lines;
    }

    static async hitler(avatar) {
        // eslint-disable-next-line no-undef
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'hitler.png'));
        const img = await Canvas.loadImage(avatar);
        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 46, 43, 140, 140);

        return canvas.toBuffer();
    }

    static async jail(avatar) {
        let img = await Canvas.loadImage(await this.greyscale(avatar));
        // eslint-disable-next-line no-undef
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'jail.png'));
        const canvas = Canvas.createCanvas(300, 300);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return canvas.toBuffer();
    }

    static async wanted(avatar) {
        // eslint-disable-next-line no-undef
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'wanted.jpg'));
        const img = await Canvas.loadImage(avatar);

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0, bg.width, bg.height);
        ctx.drawImage(img, 195, 265, 235, 295);

        return canvas.toBuffer();
    }

    static async greyscale(img) {
        const bg = await Canvas.loadImage(img);
        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imgData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            let lightness = 0.34 * pixels[i] + 0.5 * pixels[i + 1] + 0.16 * pixels[i + 2];
      
            pixels[i] = lightness;
            pixels[i + 1] = lightness;
            pixels[i + 2] = lightness;
        }
        ctx.putImageData(imgData, 0, 0);

        return canvas.toBuffer();
    }

    static async wasted(avatar) {
        // eslint-disable-next-line no-undef
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'wasted.png'));
        const img = await Canvas.loadImage(await this.greyscale(avatar));

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return canvas.toBuffer();
    }

    static async clyde(text) {
        let clyde = await fetch(`https://nekobot.xyz/api/imagegen?type=clyde&text=${encodeURIComponent(text)}`);
        clyde = await clyde.json();

        return clyde.message;
    }

    static async trigger(avatar) {
        // eslint-disable-next-line no-undef
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'triggered.png'));
        const img  = await Canvas.loadImage(avatar);

        const GIF = new GIFEncoder(300, 300);
        GIF.start();
        GIF.setRepeat(0);
        GIF.setDelay(15);

        const canvas = Canvas.createCanvas(300, 300);
        const ctx = canvas.getContext('2d');
        let i = 0;

        while(i < 9) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, Math.floor(Math.random() * 40) - 30, Math.floor(Math.random() * 40) - 30, canvas.width + 30, canvas.height + 30);

            ctx.fillStyle = '#FF000033';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(bg, Math.floor(Math.random() * 20) - 20, 300 - 54 + Math.floor(Math.random() * 20) - 20, 300 + 20, 54 + 20);

            GIF.addFrame(ctx);
            i++;
        }

        GIF.finish();

        return GIF.out.getData();
    }

    static async slap(avatar1, avatar2) {
        // eslint-disable-next-line no-undef
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'slap.png'));
        const img1 = await Canvas.loadImage(avatar1);
        const img2 = await Canvas.loadImage(avatar2);

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img1, )
    }
}

module.exports = ImageGen;