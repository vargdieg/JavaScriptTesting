const { browser} = require('@wdio/globals')
class pasteBinPage{
    async open(){
        await browser.url('https://pastebin.com/')
        await browser.maximizeWindow();
    }

    async scrollDown(x,y){
        await browser.scroll(x,y);
    }
}

module.exports = pasteBinPage;