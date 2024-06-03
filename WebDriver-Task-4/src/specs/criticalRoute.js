const { expect } = require('@wdio/globals');
const { existsSync, mkdirSync } = require('fs');

const addItemGroup = require('../PageObject/Components/addItemGroupForm.js');
const costDetailElement = require('../PageObject/Components/costsDetails.js');

const mainpage = require('../PageObject/pages/googleMainPage.js');
const searchPage = require('../PageObject/pages/googleCloudSearchPage.js');
const pricingPage = require('../PageObject/pages/googlePricingPage.js');
const estimatePreview = require('../PageObject/pages/googleEstimatePreviewPage.js');

const screenShotsFilePath = './screenshots/criticalRoute';

let googleMainPage = '';
let searchPageResult = '';
let pricingCloudPage = '';
let estimatePreviewPage = '';

let addItemGroupForm = '';
let costDetailComponent = '';

const googleMainPageTitle = 'Servicios de computación en la nube | Google Cloud';
const searchInputText = 'Google Cloud Platform Pricing Calculator';
const searchTitleText = `Resultados de la búsqueda para "${searchInputText}"  |  Google Cloud`;
const searchParams = 'Google Cloud Pricing Calculator';

const googlePricingTitle = 'Calculadora de precios de Google Cloud';
const elementToAdd = 'computeEngine';

let totalCost = '';

describe('Estimation of an order of compute', () => {
    before(async()=>{
        googleMainPage = new mainpage();
        searchPageResult = new searchPage();
        pricingCloudPage = new pricingPage();
        estimatePreviewPage = new estimatePreview();
        addItemGroupForm = new addItemGroup();
        costDetailComponent = new costDetailElement();
    
        await googleMainPage.open();
    })

    describe('Navigate to the google cloud page',()=>{
        it('Should check google main page title',async()=>{
            await expect(browser).toHaveTitle(expect.stringContaining(googleMainPageTitle));
            
            await saveScreenShot(`${screenShotsFilePath}/`,'openGoogleMainPage.png');
        })
    
        it('Should click in the search bar and fill with the desired input',async()=>{
            const findElement = await googleMainPage.FindElement;
            await findElement.click();
    
            const findElementText = await googleMainPage.FindInputText;
    
            await findElementText.setValue(searchInputText);
            await expect(findElementText).toHaveValue(searchInputText);
    
            
            await saveScreenShot(`${screenShotsFilePath}/`,'tryingToSearch.png');
            await googleMainPage.pressEnter();
        })
    
        it('Should check the title of the search page',async()=>{
            await expect(browser).toHaveTitle(expect.stringContaining(searchTitleText));
            await saveScreenShot(`${screenShotsFilePath}/`,'searchPage.png');
        })
    
        it('Should select the pricing page and redirecto to pricing page',async()=>{
            const desiredPage = await searchPageResult.FindPage(searchParams);
            await desiredPage.click();
    
            await searchPageResult.waitPage(7);
            
            await expect(browser).toHaveTitle(expect.stringContaining(googlePricingTitle));
            await saveScreenShot(`${screenShotsFilePath}/`,'pricingCalculatorPage.png');
            await pricingCloudPage.maximiseWindown();
        })
    })

    describe('Add a compute element',()=>{
        it('Should click the add estimate button and show the menu',async()=>{

            const addEstimateBttn = await pricingCloudPage.addEstimate;
            await (await addEstimateBttn).scrollIntoView({ block: 'center', inline: 'center' })
            await (await addEstimateBttn).click();
    
            await pricingCloudPage.waitForPopup(7);
            await saveScreenShot(`${screenShotsFilePath}/`,'addEstimateClicked.png');
        })

        it('Should select to add a compute item',async()=>{
            const toAdd = await addItemGroupForm.formElement(elementToAdd);
            await toAdd.scrollIntoView({ block: 'center', inline: 'center' })
            toAdd.click();
    
            await pricingCloudPage.waitForClosingPopup(7);
            await saveScreenShot(`${screenShotsFilePath}/`,'SelectCompute.png');
        })
    })

    describe('Check the estimated cost of the order',()=>{

        it('Should get the value of the order and click on share option',async()=>{
            const totalCostElement = await costDetailComponent.estimateValue;
            totalCost = await totalCostElement.getHTML(false);

            const shareButton = await costDetailComponent.shareButt;
            await shareButton.scrollIntoView({ block: 'center', inline: 'center' })
            shareButton.click();
            await pricingCloudPage.waitForPopup(15);
            
            await saveScreenShot(`${screenShotsFilePath}/`,'estimateShareScreen.png');
        })

        it('Should open the summary estimation',async()=>{

            const summaryBttn = await costDetailComponent.summaryBttn;
            summaryBttn.click();
            await costDetailComponent.waitForDetails(7);

            await estimatePreviewPage.switchToEstimate();
            await saveScreenShot(`${screenShotsFilePath}/`,'summaryEstimation.png');
        })

        it('Should compare the total estimated cost on new page and the old page',async()=>{
            const totalEstimated = await estimatePreviewPage.estimatedCost;

            await expect(totalEstimated).toHaveText(totalCost);
            await saveScreenShot(`${screenShotsFilePath}/`,'checkingValues.png');
        })

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

async function saveScreenShot(dirPath,filename){
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, {
          recursive: true,
        });
    }
    await browser.saveScreenshot(dirPath + filename)
}