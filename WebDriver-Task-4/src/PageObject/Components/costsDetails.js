class costDetails {
    get rootEl(){
        return $('//div[contains(@class,"uMSQA") and contains(@jsname,"Olpjye")]')
    }

    get estimateValue(){
        return this.rootEl.$('//label[contains(@class,"gt0C8e")]')
    }

    get shareButt(){
        return this.rootEl.$('//button[contains(@aria-label,"Open Share Estimate dialog")]');
    }

    get summaryBttn(){
        return this.rootEl.$('//a[contains(text(),"Open estimate summary")]');
    }

    waitForDetails(time){
        return this.rootEl.waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: `not showing up the costDetails`, interval: 500 })
    }
}

module.exports = costDetails;