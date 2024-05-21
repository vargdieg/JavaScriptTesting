class searchPage {

    get rootEl(){
        return $('//div[contains(@class,"gsc-expansionArea")]')
    }

    get title(){
        return $('//title');
    }

    FindPage(pageTitle){
        return this.rootEl.$(`//b[contains(text(),"${pageTitle}")]`);
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
}
module.exports = searchPage