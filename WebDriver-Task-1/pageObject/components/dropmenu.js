class dropmenu {
    get rootEl(){
        return $('#select2-postform-expiration-results');
    }
    
    async dropMenuElement(param){
        const selector = {
            '10m': '10 Minutes'
        }

        const dropList = await this.rootEl.$$('li');
        const findElements = await dropList.filter(async (element)=>{
            const htmltext = await element.getHTML();
            if(htmltext.includes(selector[param.toLowerCase()])){
                return true;
            }
            return false;
        })
        return findElements[0];
    }
}
module.exports = dropmenu