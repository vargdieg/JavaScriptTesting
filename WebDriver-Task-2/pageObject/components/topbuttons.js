class topbuttons {
    get rootEl(){
        return $('.top-buttons');
    }

    buttonElement(param){
        const selector = {
            typelanguage : '.left>.btn',
        }
        return this.rootEl.$(`${selector[param.toLowerCase()]}`)
    }
}

module.exports = topbuttons