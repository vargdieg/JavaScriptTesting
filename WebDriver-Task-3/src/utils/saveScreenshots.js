const { existsSync, mkdirSync } = require('fs');

async function saveScreenShot(dirPath,filename){
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, {
          recursive: true,
        });
    }
    await browser.saveScreenshot(dirPath + filename)
}

module.exports = {
    saveScreenShot
};