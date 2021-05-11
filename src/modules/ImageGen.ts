import path from 'path';
import Canvas from 'canvas';
import GIFEncoder from 'gifencoder';
import parser from '@canvacord/emoji-parser';

interface GetLineOps { 
    text: string;
    ctx: CanvasRenderingContext2D;
    maxWidth: number;
}

export default class ImageGen {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    public static async affect(avatar: string | Buffer) {
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'affect.png'));
        const img = await Canvas.loadImage(avatar);

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 180, 385, 200, 153);

        return canvas.toBuffer();
    }

    public static async changemymind(text: string) {
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
            await parser.fillTextWithTwemoji(ctx, lines[i], 10, i * fontSize - 5);
            i++;
        } while (i < lines.length)

        return canvas.toBuffer();
    }

    private static _getLines(ops: GetLineOps) {
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

    public static async hitler(avatar: string | Buffer) {
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'hitler.png'));
        const img = await Canvas.loadImage(avatar);
        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 46, 43, 140, 140);

        return canvas.toBuffer();
    }

    public static async jail(avatar: string | Buffer) {
        let img = await Canvas.loadImage(await this.greyscale(avatar));
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'jail.png'));
        const canvas = Canvas.createCanvas(300, 300);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return canvas.toBuffer();
    }

    public static async wanted(avatar: string | Buffer) {
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'wanted.jpg'));
        const img = await Canvas.loadImage(avatar);

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0, bg.width, bg.height);
        ctx.drawImage(img, 194, 265, 237, 299);

        return canvas.toBuffer();
    }

    public static async greyscale(img: string | Buffer) {
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

    public static async wasted(avatar: string | Buffer) {
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'wasted.png'));
        const img = await Canvas.loadImage(await this.greyscale(avatar));

        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return canvas.toBuffer();
    }

    private static _shorten(str: string, maxChar: number = 60) {
        return str.substring(0, maxChar);
    }

    public static async clyde(text: string) {
        let bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'clyde.png'));

        Canvas.registerFont(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'fonts', 'MANROPE_REGULAR.ttf'), {
            family: "Manrope",
            weight: "regular",
            style: "normal"
        });

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0);

        ctx.font = '17px Manrope';
        ctx.fillStyle = 'white';
        await parser.fillTextWithTwemoji(ctx, await this._shorten(text, 60), 75, 50);

        return canvas.toBuffer();
    }

    public static async trigger(avatar: string | Buffer) {
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
            ctx.drawImage(img, Math.floor(Math.random() * 30) - 30, Math.floor(Math.random() * 30) - 30, canvas.width + 30, canvas.height + 30);

            ctx.fillStyle = '#FF000033';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(bg, Math.floor(Math.random() * 20) - 20, 300 - 54 + Math.floor(Math.random() * 20) - 20, 300 + 20, 54 + 20);

            GIF.addFrame(ctx);
            i++;
        }

        GIF.finish();

        return GIF.out.getData();
    }

    public static async slap(avatar1: string | Buffer, avatar2: string | Buffer) {
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'slap.png'));
        const img1 = await Canvas.loadImage(avatar1);
        const img2 = await Canvas.loadImage(avatar2);

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img1, 500, 75, 300, 300);
        ctx.drawImage(img2, 800, 350, 300, 300);
        
        return canvas.toBuffer();
    }

    public static async pixelate(img: string | Buffer) {
        const image = await Canvas.loadImage(img);

        const canvas = Canvas.createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        const pixels = 5 / 100;

        ctx.drawImage(image, 0, 0, canvas.width * pixels, canvas.height * pixels);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, 0, 0, canvas.width * pixels, canvas.height * pixels, 0, 0, canvas.width, canvas.height);

        return canvas.toBuffer();
    }

    public static async circle(img: string | Buffer) {
        const image = await Canvas.loadImage(img);

        const canvas = Canvas.createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0);

        ctx.globalCompositeOperation = "destination-in";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        return canvas.toBuffer();
    }

    public static async invert(img: string | Buffer) {
        const image = await Canvas.loadImage(img);
        const canvas = await Canvas.createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for(let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 - imgData.data[i];
            imgData.data[i + 1] = 255 - imgData.data[i + 1];
            imgData.data[i + 2] = 255 - imgData.data[i + 2];
            imgData.data[i + 3] = 255;
        }

        ctx.putImageData(imgData, 0, 0);

        return canvas.toBuffer();
    }

    public static async youtube(img: string | Buffer, username: string, text: string) {
        const bg = await Canvas.loadImage(await this.invert(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'youtube.png')));
        const image = await Canvas.loadImage(await this.circle(img));

        Canvas.registerFont(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'fonts', 'ROBOTO_REGULAR.ttf'), {
            family: "Roboto",
            weight: "regular",
            style: "normal"
        });

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, -3, -3, canvas.width + 5, canvas.height + 5);
        ctx.drawImage(image, 15, 25, 60, 60);

        const timeNumber = Math.floor(Math.random() * (59 - 1)) + 1;
        const timeString = `${timeNumber + (timeNumber == 1 ? " minute" : " minutes")} ago`;

        const name = this._shorten(username, 21);
        const comment = this._shorten(text, 50);

        ctx.font = '20px Roboto';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(name, 90, 50);

        ctx.font = '15px Roboto';
        ctx.fillStyle = '#909090';
        ctx.fillText(timeString, ctx.measureText(name).width + 130, 50);

        ctx.font = '20px Roboto';
        ctx.fillStyle = '#FFFFFF';
        await parser.fillTextWithTwemoji(ctx, comment, 90, 85);
        
        return canvas.toBuffer();
    }

    public static async presentation(text: string) {
        const bg = await Canvas.loadImage(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'img', 'presentation.png'));

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        let x = text.length;
        let fontSize = 70;
        if (x <= 15) {
            ctx.translate(175, 220);
        } else if (x <= 30) {
            fontSize = 50;
            ctx.translate(175, 220);
        } else if (x <= 70) {
            fontSize = 40;
            ctx.translate(185, 220);
        } else if (x <= 85) {
            fontSize = 32;
            ctx.translate(185, 220);
        } else if (x < 100) {
            fontSize = 26;
            ctx.translate(185, 220);
        } else if (x < 120) {
            fontSize = 21;
            ctx.translate(185, 220);
        } else if (x < 180) {
            fontSize = 0.0032 * (x * x) - 0.878 * x + 80.545;
            ctx.translate(185, 220);
        } else if (x < 700) {
            fontSize = 0.0000168 * (x * x) - 0.0319 * x + 23.62;
            ctx.translate(170, 220);
        } else {
            fontSize = 10;
            ctx.translate(170, 210);
        }
        ctx.font = `${fontSize}px Arial`;

        const lines = await this._getLines({ text, ctx, maxWidth: 345 });
        let i = 0;
        do {
            await parser.fillTextWithTwemoji(ctx, lines[i], 0, i * fontSize - 100);
            i++;
        } while (i < lines.length)

        return canvas.toBuffer();
    }

    public static async hex(hex: string) {
        const canvas = Canvas.createCanvas(1200, 600);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = hex;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return canvas.toBuffer();
    }

    public static async guildIcon(name: string, size: number) {
        let str = name
        .replace(/'s /g, " ")
        .replace(/\w+/g, e => e[0])
        .replace(/\s/g, "");

        Canvas.registerFont(path.join(path.dirname(path.dirname(__dirname)), 'assets', 'fonts', 'ROBOTO_REGULAR.ttf'), {
            family: "Roboto",
            weight: "regular",
            style: "normal"
        });

        const canvas = Canvas.createCanvas(size, size);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = "#7289DA";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = `${size / 4}px Roboto`;
        await parser.fillTextWithTwemoji(ctx, str, canvas.width / 4, canvas.height / 1.7);

        return canvas.toBuffer();
    }
}