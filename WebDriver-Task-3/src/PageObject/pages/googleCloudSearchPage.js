class searchPage {

    get rootEl(){
        return $('//div[contains(@class,"gsc-expansionArea")]')
    }

    FindPage(pageTitle){
        return this.rootEl.$(`//b[contains(text(),"${pageTitle}")]`);
    }

    async navigateToPage(pageTitle){
        const desiredPage = await this.FindPage(pageTitle);
        await desiredPage.click();
    }
}
module.exports = searchPage