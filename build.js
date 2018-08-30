const fs = require('fs');
const path = require('path');

const BASE_FIR = path.join(__dirname, 'tokens');
const ENC = 'utf8';
const JSON_RE = /\.json$/;

const tokens = [];

console.log('Reading ./tokens directory');
const dirs = fs.readdirSync(BASE_FIR, ENC);

dirs.forEach((tokenDir) => {
    const fullPath = path.join(BASE_FIR, tokenDir);
    if (!fs.lstatSync(fullPath).isDirectory()) return;

    console.log('Processing ', tokenDir)

    const files = fs.readdirSync(fullPath, ENC).filter(x => JSON_RE.test(x))
    files.forEach((jsonFile) => {
        console.log('\tReading ', jsonFile);
        const json = fs.readFileSync(path.join(fullPath, jsonFile), ENC);
        tokens.push(JSON.parse(json));
    });
});

const destination = path.join(__dirname, '.dist');

if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
}

console.log('Writing .dist/erc20_tokens.json');
fs.writeFileSync(path.join(destination, 'erc20_tokens.json'), JSON.stringify(tokens), ENC);
