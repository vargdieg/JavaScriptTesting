class mainPage{
    open(){
        return browser.url('https://cloud.google.com/?hl=es-419');
    }

    get inputSearchContainer(){
        return $('//div[contains(@class,"ND91id ") and contains(@jsname,"MVsrn")]');
    }

    get InputSearchText(){
        return this.inputSearchContainer.$('//input[contains(@class,"mb2a7b") and contains(@jsname,"jjXxte")]');
    }

    pressEnter(){
        return browser.keys('\uE007')
    }

    inputButtonExists(time){
        return this.inputSearchContainer.waitForExist({ timeout : time*1000, reverse: false, timeoutMsg: 'Input button did not show up :(', interval: 30 });
    }

    async clickInputSearchButton(){
        await this.inputButtonExists(5);
        const inputContainer = await this.inputSearchContainer;
        await inputContainer.click();
    }

    async fillInputText(stringToSearch){
        const inputText = await this.InputSearchText;
        await inputText.setValue(stringToSearch);
        await expect(inputText).toHaveValue(stringToSearch);
    }
}

module.exports = mainPage;