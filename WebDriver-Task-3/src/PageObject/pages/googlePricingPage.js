const instanceForm = require('../Components/pricingpageComponents/instanceForm.js');
const browseutils = require('../../utils/browserUtils.js');

class googlePricingPage {

    instance = new instanceForm();

    open(){
        return browser.url('https://cloud.google.com/products/calculator?hl=es-419')
    }

    get addEstimate(){
        return $('//span[contains(@class,"AeBiU-vQzf8d") and contains(@jsname,"V67aGc") and contains(text(),"Add to estimate")]')
    }

    get popup(){
        return $('//div[contains(@class,"bwApif-cnG4Wd") and contains(@jsname,"rZHESd")]')
    }

    async maximiseWindown(){
        await browser.maximizeWindow();
    }

    async addProductClick(){
        const addEstimateBttn = await this.addEstimate;
        await addEstimateBttn.scrollIntoView({ block: 'center', inline: 'center' })
        await addEstimateBttn.click();
        await browseutils.waitForDisplay(this.popup,7,'The product pop up did not show');
    }

}

module.exports = googlePricingPage;