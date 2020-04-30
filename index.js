const Jimp = require('jimp');
const twitter = require('./twitter');

function randomHexValue() {
    const vals = '0123456789ABCDEF';
    let color = '000000'.split('');
    return color.map(() => vals[Math.floor(Math.random() * 16)]).join('');
}

function getColor() {
    return new Promise((resolve, reject) => {
        const hex = `#${randomHexValue()}`;
        new Jimp(1920, 1080, hex, (err, image) => {
            image.getBufferAsync(Jimp.MIME_PNG)
                .then(buffer => resolve({ color: hex, buffer: buffer }))
        });
    });
}

getColor()
    .then(res => twitter.media(res.color, res.buffer));