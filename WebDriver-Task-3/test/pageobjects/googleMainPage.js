class mainPage{
    open(){
        return browser.url(`https://cloud.google.com/`)
    }

    get header(){
        return $('//div[contains(@class,"ZUAiPc") and contains(@jsname,"RShKxc")]');
    }

    get FindElement(){
        return this.header.$('//div[contains(@class,"ND91id ") and contains(@jsname,"MVsrn")]');
    }

    get FindInputText(){
        return this.FindElement.$('//input[contains(@class,"mb2a7b") and contains(@jsname,"jjXxte")]');
    }
}

module.exports = mainPage;