class form {
    get rootEl(){
        return $('.js-post-form');
    }

    formElements(param){
        const selector = {
            text : '.js-create-form>.form-group>.js-paste-code',
            expirationbutton: '#select2-postform-expiration-container',
            highlight: '#select2-postform-format-container',
            pastetitle: '#postform-name',
            addbutton: '.form-btn-container>.btn'
        }
        return this.rootEl.$(`${selector[param.toLowerCase()]}`)
    }

}

module.exports = form