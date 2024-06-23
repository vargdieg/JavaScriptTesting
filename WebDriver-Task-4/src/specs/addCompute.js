const addItemGroup = require('../PageObject/Components/addItemGroupForm.js');
const costDetail = require('../PageObject/Components/costsDetails.js');

const mainpage = require('../PageObject/pages/googleMainPage.js');
const searchPage = require('../PageObject/pages/googleCloudSearchPage.js');
const pricingPage = require('../PageObject/pages/googlePricingPage.js');
const estimatePreview = require('../PageObject/pages/googleEstimatePreviewPage.js');

const screenShots = require('../utils/saveScreenshots.js');
const browseutils = require('../utils/browserUtils.js');

let environmet = process.env.NODE_ENV;

const testInstance = require(`../datatest/${environmet}.js`);
const validationValues = require('../validation/validateValues.js');
const screenShotsFilePath = `./screenshots/${environmet}`;

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
        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'addEstimateClicked.png');
    })

    it('Should select to add a compute item',async()=>{
        await addItemGroupForm.addProductType(productType)
        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'SelectCompute.png');
    })

    it('Should select a number of instances',async()=>{
        await pricingCloudPage.instance.changeInstancesNumber(testInstance.numberOfInstances);
        await pricingCloudPage.instance.verifyNumberOfInstances(testInstance.numberOfInstances)
        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'numberOfInstances.png');
    })

    it('Should select operating system',async()=>{
        await pricingCloudPage.instance.changeOperatingSystem(testInstance.operatingSystemValue);
        await pricingCloudPage.instance.verifyValueOperatingSystem(validationValues.osSelector[testInstance.operatingSystemValue]);
        
        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'operatingSystem.png');
    })

    it('Should select the provisioning model', async()=>{
        await pricingCloudPage.instance.changeProvisionModel(testInstance.provisionModelSelection);
        await pricingCloudPage.instance.checkProvisionModelSelected(testInstance.provisionModelSelection);

        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'provisionModel.png');
    })

    it('Should select the machine family', async()=>{
        await pricingCloudPage.instance.changeMachineFamily(testInstance.machineFamilyValue);
        await pricingCloudPage.instance.checkMachineFamilySelection(validationValues.machineTypeSelector[testInstance.machineFamilyValue]);

        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'machineFamily.png');
    })

    it('Should select the machine series',async()=>{
        await pricingCloudPage.instance.changeMachineSeries(testInstance.seriesMachineValue);
        await pricingCloudPage.instance.checkMachineSeriesSelection(validationValues.seriesSelector[testInstance.seriesMachineValue]);

        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'machineSeries.png');
    })

    it('Should select the machine type',async()=>{
        await pricingCloudPage.instance.changeMachineType(testInstance.machineTypeValue);
        await pricingCloudPage.instance.checkMachineTypeSelection(validationValues.typeMachineSelector[testInstance.machineTypeValue]);

        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'machineType.png');
    })

    it('Should select the addGPU button if needed',async ()=>{
        await pricingCloudPage.instance.selectGPUButton(testInstance.addGPU);
        await pricingCloudPage.instance.checkGPUButton(testInstance.addGPU);

        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'checkGPU.png');
    })

    it('Should select GPU model in case GPU is selected',async ()=>{
        if(testInstance.addGPU == 'true'){
            await pricingCloudPage.instance.changeGPUModel(testInstance.gpuModelValue);
            await pricingCloudPage.instance.checkGPUModel(validationValues.gpuModelSelector[testInstance.gpuModelValue]);

            await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'gpuModelSelection.png');
        }
    })

    it('Should select number of GPU in case GPU is selected',async ()=>{
        if(testInstance.addGPU == 'true'){
            await pricingCloudPage.instance.changeNumberGPU(testInstance.gpuNumberValue);
            await pricingCloudPage.instance.checkNumberGPU(validationValues.gpuNumberselector[testInstance.gpuNumberValue]);

            await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'numberGPU.png');
        }
    })

    it('Should select the local ssd',async()=>{
        await pricingCloudPage.instance.changeLocalSSD(testInstance.localSSDValue);
        await pricingCloudPage.instance.checkLocalSSD(validationValues.localSSDSelector[testInstance.localSSDValue]);

        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'localSSDSelector.png');
    })

    it('Should select the region',async()=>{
        await pricingCloudPage.instance.changeRegion(testInstance.regionValue);
        await pricingCloudPage.instance.checkRegion(validationValues.regionSelector[testInstance.regionValue]);

        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'regionSelector.png');
    })

    it('Should select commited use discount options', async()=>{
        await pricingCloudPage.instance.changeCommitedOptions(testInstance.commitedSelection);
        await pricingCloudPage.instance.checkCommitedOptions(testInstance.commitedSelection);

        await screenShots.saveScreenShot(`${screenShotsFilePath}/${testInstance.name}/`,'commitedOptions.png');
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

