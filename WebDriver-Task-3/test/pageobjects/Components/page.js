class page{
    pressEnter(){
        return browser.keys('\uE007')
    }
    waitPage(timeToWait){
        return browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
              timeout: timeToWait * 1000,
              timeoutMsg: 'Message on failure'
            }
          );
    }
}
module.exports = page;