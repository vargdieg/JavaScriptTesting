class searchPage {

    get rootEl(){
        return $('//div[contains(@class,"gsc-expansionArea")]')
    }

    FindPage(pageTitle){
        return this.rootEl.$(`//b[contains(text(),"${pageTitle}")]`);
    }
}
module.exports = searchPage