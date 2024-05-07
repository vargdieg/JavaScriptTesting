class dropmenu {
    get rootEl(){
        return $('#select2-postform-expiration-results');
    }
    
    async dropMenuElement(param){
        const selector = {
            '10m': '10M'
        }
        const findElements = await this.rootEl.$(`//li[contains(@id,"${selector[param]}")]`)
        return findElements;
    }
}
module.exports = dropmenu