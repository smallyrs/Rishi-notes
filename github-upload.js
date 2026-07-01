const fs = require('fs');
const path = require('path');
const https = require('https');

const TOKEN = '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';
const REPO = 'smallyrs/secretnote';

const filesToUpload = [
    'server.js',
    'database.js',
    'package.json',
    '.gitignore',
    'routes/api.js',
    'public/index.html',
    'public/style.css',
    'public/app.js'
];

async function uploadFile(filePath) {
    return new Promise((resolve, reject) => {
        const fullPath = path.join(__dirname, filePath);
        const content = fs.readFileSync(fullPath, 'utf8');
        const encodedContent = Buffer.from(content).toString('base64');

        const body = JSON.stringify({
            message: `Add ${filePath}`,
            content: encodedContent
        });

        const options = {
            hostname: 'api.github.com',
            path: `/repos/${REPO}/contents/${filePath}`,
            method: 'PUT',
            headers: {
                'Authorization': `token ${TOKEN}`,
                'User-Agent': 'NodeJS-Uploader',
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log(`✅ Uploaded ${filePath}`);
                    resolve();
                } else {
                    console.error(`❌ Failed ${filePath}: ${res.statusCode}`);
                    resolve(); // resolve anyway to continue loop
                }
            });
        });

        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

async function start() {
    console.log(`Starting upload to ${REPO}...`);
    for (const file of filesToUpload) {
        await uploadFile(file);
    }
    console.log('Upload complete!');
}

start();
