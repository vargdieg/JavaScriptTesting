class estimatePreview{

    get url(){
        return 'https://cloud.google.com/products/calculator/estimate-preview'
    }

    get estimatedCost(){
        return $('//div[contains(@class,"FxOIgc")]//div[contains(@class,"WkJlle")]//h4[contains(@class,"n8xu5")]')
    }
    
}

module.exports = estimatePreview;