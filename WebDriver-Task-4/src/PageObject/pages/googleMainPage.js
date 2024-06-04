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
        return $('//div[contains(@class,"ND91id ") and contains(@jsname,"MVsrn")]');
    }

    get FindInputText(){
        return this.FindElement.$('//input[contains(@class,"mb2a7b") and contains(@jsname,"jjXxte")]');
    }

    pressEnter(){
        return browser.keys('\uE007')
    }

    waitPage(timeToWait){
        return browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
              timeout: timeToWait * 1000,
              timeoutMsg: 'Page did not load :('
            }
          );
    }

    elementExist(param,time){
        const selector = {
            inputbttn: this.FindElement.waitForExist({ timeout : time*1000, reverse: false, timeoutMsg: 'Input button did not show up :(', interval: 30 })
        }
        return selector[param];
    }
}

module.exports = mainPage;