class estimatePreview{

    get estimatedCost(){
        return $('//div[contains(@class,"FxOIgc")]//div[contains(@class,"WkJlle")]//h4[contains(@class,"n8xu5")]')
    }

    async switchToEstimate(){
        await browser.switchWindow('https://cloud.google.com/products/calculator/estimate-preview');
    }

}

module.exports = estimatePreview;