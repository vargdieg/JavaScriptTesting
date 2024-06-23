const browseutils = require('../../utils/browserUtils.js');

class costDetails {
    get rootEl(){
        return $('//div[contains(@class,"uMSQA") and contains(@jsname,"Olpjye")]')
    }

    get estimateValue(){
        return this.rootEl.$('//label[contains(@class,"gt0C8e")]')
    }

    get shareButt(){
        return this.rootEl.$('//button[contains(@aria-label,"Open Share Estimate dialog")]');
    }

    get summaryBttn(){
        return this.rootEl.$('//a[contains(text(),"Open estimate summary")]');
    }

    get popup(){
        return $('//div[contains(@class,"bwApif-cnG4Wd") and contains(@jsname,"rZHESd")]')
    }

    async totalCost(){
        const totalCostElement = await this.estimateValue;
        return totalCostElement.getHTML(false);
    }

    async shareEstimatedCost(){
        const shareButton = await this.shareButt;
        await shareButton.scrollIntoView({ block: 'center', inline: 'center' })
        shareButton.click();
        await browseutils.waitForDisplay(this.popup,15,"The share Estimated pop up did not appear");
    }

    async clickSummaryBtton(){
        const summaryBttn = await this.summaryBttn;
        summaryBttn.click();
        await browseutils.waitForDisplay(this.rootEl,7,"not showing up the costDetails");
    }
}

module.exports = costDetails;