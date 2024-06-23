const browseutils = require('../../utils/browserUtils.js');

class addEstimateForm{
    get rootEl(){
        return $('//div[contains(@class,"bwApif-cnG4Wd") and contains(@jsname,"rZHESd")]')
    }

    get filterEl(){
        return this.rootEl.$('//input[contains(@id,"c2")]')
    }

    get popup(){
        return $('//div[contains(@class,"bwApif-cnG4Wd") and contains(@jsname,"rZHESd")]')
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

    async addProductType(elementToAdd){
        const toAdd = await this.formElement(elementToAdd);
        await toAdd.scrollIntoView({ block: 'center', inline: 'center' })
        toAdd.click();

        await browseutils.waitForVanish(this.popup,7,'The element to add popup did not vanish');
    }
}

module.exports=addEstimateForm;