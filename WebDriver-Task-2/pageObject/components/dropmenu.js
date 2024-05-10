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
        const selector = {
            bash: 'Bash'
        }
        const select = await this.langEl.$(`//li[contains(text(),"${selector[param.toLowerCase()]}")]`);
        return select;
    }

    async filterMenuLanguages(param){
        const filter = await this.filterLangEl;
        filter.setValue(param);
    }
}

module.exports = dropmenu