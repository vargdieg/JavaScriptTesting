class googlePricingPage {
    open(){
        return browser.url('https://cloud.google.com/products/calculator?hl=es')
    }

    get addEstimate(){
        return $('//span[contains(@class,"AeBiU-vQzf8d") and contains(@jsname,"V67aGc") and contains(text(),"Add to estimate")]')
    }

    get popup(){
        return $('//div[contains(@class,"bwApif-cnG4Wd") and contains(@jsname,"rZHESd")]')
    }

    waitForPopup(time){
        return this.popup.waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: 'Pop up did not show', interval: 500 })
    }

    waitForClosingPopup(time){
        return this.popup.waitForDisplayed({ timeout: time*1000, reverse: true, timeoutMsg: 'Pop up did not vanish', interval: 500 })
    }

    async scrollDown(x,y){
        await browser.scroll(x,y);
    }

    async maximiseWindown(){
        await browser.maximizeWindow();
    }
    
}

module.exports = googlePricingPage;