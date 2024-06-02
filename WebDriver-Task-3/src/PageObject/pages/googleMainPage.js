class mainPage{
    open(){
        return browser.url('https://cloud.google.com/?hl=es-419');
    }

    get title(){
        return $('//head//title');
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

    pressEnter(){
        return browser.keys('\uE007')
    }
}

module.exports = mainPage;