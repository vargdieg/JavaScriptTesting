class dropmenu {
    get rootEl(){
        return $('#select2-postform-expiration-results');
    }
    
    get langEl(){
        return $('#select2-postform-format-results');
    }

    get filterLangEl(){
        return $('.select2-search--dropdown>input.select2-search__field')
    }

    async dropMenuElement(param){
        const selector = {
            '10m': '10M'
        }
        const findElements = await this.rootEl.$(`//li[contains(@id,"${selector[param]}")]`)
        return findElements;
    }

    async dropMenuLanguages(param){
        if(param != 'None'){
            const selector = {
                bash: 'Bash'
            }
            const select = await this.langEl.$(`//li[contains(text(),"${selector[param.toLowerCase()]}")]`);
            return select;
        }else{
            return await findElementInList('None',this.langEl.$$('li'));
        }
    }

    async filterMenuLanguages(param){
        const filter = await this.filterLangEl;
        filter.setValue(param);
    }
}

async function findElementInList(text,arrayList){
    const findElements = await arrayList.filter(async (element)=>{
        const htmltext = await element.getHTML();
        if(htmltext.includes(text)){
            return true;
        }
        return false;
    })
    return findElements[0];
}

module.exports = dropmenu