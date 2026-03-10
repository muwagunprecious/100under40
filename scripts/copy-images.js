const fs = require('fs');
const path = require('path');

const srcFiles = {
    "hero-award": "media__1773145451774.jpg",
    "speaker-award": "media__1773145451867.jpg",
    "group-award": "media__1773145451905.jpg",
};

const srcDir = 'C:\\Users\\TINGO-AI-010\\.gemini\\antigravity\\brain\\89995afc-8be4-47a8-ae61-bc5d36106f6c';
const destDir = 'C:\\Users\\TINGO-AI-010\\Documents\\100under40\\public';

for (const [destName, srcName] of Object.entries(srcFiles)) {
    const srcPath = path.join(srcDir, srcName);
    const destPath = path.join(destDir, `${destName}.jpg`);

    try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Successfully copied ${srcName} to ${destName}.jpg`);
    } catch (error) {
        console.error(`Failed to copy ${srcName}:`, error);
    }
}
