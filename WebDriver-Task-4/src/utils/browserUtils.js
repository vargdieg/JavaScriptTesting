async function switchToEstimate(url){
    await browser.switchWindow(url);
}

async function waitForDisplay(selector,time = 5,message = "This selector is not showing"){
    return selector.waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: message, interval: 10 })
}

async function waitForVanish(selector,time = 5,message = "This selector is not dissapearing"){
    return selector.waitForDisplayed({ timeout: time*1000, reverse: true, timeoutMsg: message, interval: 10 })
}

module.exports = {
    switchToEstimate,
    waitForDisplay,
    waitForVanish
}