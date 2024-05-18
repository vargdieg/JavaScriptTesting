class addEstimateForm{
    get rootEl(){
        return $('//div[contains(@class,"bwApif-cnG4Wd") and contains(@jsname,"rZHESd")]')
    }

    get filterEl(){
        return this.rootEl.$('//input[contains(@id,"c2")]')
    }

    formElement(param){
        const selector = {
            computeEngine: 'Compute Engine',
            cloudStorage: 'Cloud Storage',
            cloudSQL: 'Cloud SQL',
            kubernetes: 'Google Kubernetes Engine'
        }
        return this.rootEl.$(`//div[contains(@class,"VobRQb")]//h2[contains(text(),"${selector[param]}")]`)
    }
}

module.exports=addEstimateForm;