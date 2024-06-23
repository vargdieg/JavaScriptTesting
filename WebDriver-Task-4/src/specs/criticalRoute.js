const addItemGroup = require('../PageObject/Components/addItemGroupForm.js');
const costDetail = require('../PageObject/Components/costsDetails.js');

const mainpage = require('../PageObject/pages/googleMainPage.js');
const searchPage = require('../PageObject/pages/googleCloudSearchPage.js');
const pricingPage = require('../PageObject/pages/googlePricingPage.js');
const estimatePreview = require('../PageObject/pages/googleEstimatePreviewPage.js');

const screenShots = require('../utils/saveScreenshots.js');
const browseutils = require('../utils/browserUtils.js');

const screenShotsFilePath = `./screenshots/criticalRoute`;

let googleMainPage = '';
let searchPageResult = '';
let pricingCloudPage = '';
let estimatePreviewPage = '';

let addItemGroupForm = '';
let costDetailComponent = '';

const searchInputText = 'Google Cloud Platform Pricing Calculator';
const googleCloudPricingSearchPage = 'Google Cloud Pricing Calculator';
const productType = 'computeEngine';
let totalCost = '';

describe('Navigate from google cloud main page to estimate google instances cost', () => {
    before(async()=>{
        googleMainPage = new mainpage();
        searchPageResult = new searchPage();
        pricingCloudPage = new pricingPage();
        estimatePreviewPage = new estimatePreview();
        addItemGroupForm = new addItemGroup();
        costDetailComponent = new costDetail();
    
        await googleMainPage.open();
    })
  
    it('Should click in the search bar and fill with the desired input',async()=>{
        await googleMainPage.clickInputSearchButton();
        await googleMainPage.fillInputText(searchInputText);

        await screenShots.saveScreenShot(`${screenShotsFilePath}/`,'tryingToSearch.png');
        await googleMainPage.pressEnter();
    })
    
    it('Should select the pricing page and redirecto to pricing page',async()=>{            
        await searchPageResult.navigateToPage(googleCloudPricingSearchPage)
        
        await screenShots.saveScreenShot(`${screenShotsFilePath}/`,'pricingCalculatorPage.png');
        await pricingCloudPage.maximiseWindown();
    })

    it('Should click the add estimate button and show the menu',async()=>{
        await pricingCloudPage.addProductClick();
        await screenShots.saveScreenShot(`${screenShotsFilePath}/`,'addEstimateClicked.png');
    })

    it('Should select to add a compute item',async()=>{
        await addItemGroupForm.addProductType(productType)
        await screenShots.saveScreenShot(`${screenShotsFilePath}/`,'SelectCompute.png');
    })

    it('Should get the value of the order and click on share option',async()=>{
        totalCost = await costDetailComponent.totalCost();
        await costDetailComponent.shareEstimatedCost();
        await screenShots.saveScreenShot(`${screenShotsFilePath}/`,'estimateShareScreen.png');
    })

    it('Should open the summary estimation',async()=>{
        await costDetailComponent.clickSummaryBtton();
        await browseutils.switchToEstimate(estimatePreviewPage.url);
        await screenShots.saveScreenShot(`${screenShotsFilePath}/`,'summaryEstimation.png');
    })

    it('Should compare the total estimated cost on new page and the old page',async()=>{
        const totalEstimated = await estimatePreviewPage.estimatedCost;
        await expect(totalEstimated).toHaveText(totalCost);

        await screenShots.saveScreenShot(`${screenShotsFilePath}/`,'checkingValues.png');
    })

    after(async()=>{
        googleMainPage = null;
        searchPageResult = null;
        pricingCloudPage = null;
        estimatePreviewPage = null;
        addItemGroupForm = null;
        costDetailComponent = null;
    })
})

