const { expect } = require('@wdio/globals')
const title = require('../pageobjects/Components/titleComponent.js');
const basePage = require('../pageobjects/Components/page.js');
const addEstimateForm = require('../pageobjects/Components/addEstimateForm.js');
const instanceFormElement = require('../pageobjects/Components/instanceForm.js');
const costDetailElement = require('../pageobjects/Components/costsDetails.js');
const estimatePreviewElement = require('../pageobjects/Components/estimatePreview.js');
const mainpage = require('../pageobjects/googleMainPage.js');
const searchPage = require('../pageobjects/googleCloudSearchPage.js');
const pricingPage = require('../pageobjects/googlePricingPage.js');
const { existsSync, mkdirSync } = require('fs');

const testInstance = require('../datatest/dataTest.js');

const screenShotsFilePath = './screenshots';

let googleMainPage = '';
let searchPageResult = '';
let pricingCloudPage = '';
let titleComponent = '';
let basePageComponent = '';
let addEstForm = '';
let instanceForm = '';
let costDetailComponent = '';
let estimatePreviewComponent = '';

const googleMainPageTitle = 'Servicios de cloud computing | Google Cloud';
const searchInputText = 'Google Cloud Platform Pricing Calculator';
const searchTitleText = `Resultados de la búsqueda de "${searchInputText}"  |  Google Cloud`;
const searchParams = 'Google Cloud Pricing Calculator';

const googlePricingTitle = 'Calculadora de precios de Google Cloud';

const elementToAdd = 'computeEngine';

let totalCost = '';

const osSelector = {
    free: 'Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)',
    paidubuntu: 'Paid: Ubuntu Pro',
    paidwindows2012: 'Paid: Windows Server 2012 R2, Windows Server 2016, Windows Server 2019, Windows Server (2004, 20H2)'
}

const provisionModelSelector = {
    regular: 'regular',
    spot: 'spot'
}

const machineTypeSelector = {
    generalpurpose :'General Purpose',
    computeoptimized:'Compute-optimized',
    memoryoptimized:'Memory-optimized'
}

const seriesSelector = {
    n1: 'N1',
    n2: 'N2',
    e2: 'E2'
}

const typeMachineSelector = {
    n1standar1: 'n1-standard-1',
    n1standar2: 'n1-standard-2',
    n1standar4: 'n1-standard-4',
    n2standar2: 'n2-standard-2'
}

const gpuModelSelector = {
    nvidiateslap100: 'NVIDIA Tesla P100',
    nvidiateslap4: 'NVIDIA Tesla P4',
    nvidiateslav100: 'NVIDIA Tesla V100',
    nvidiateslat4: 'NVIDIA Tesla T4'
}

const gpuNumberselector = {
    1: '1',
    2: '2',
    4: '4',
    8: '8'
}

const localSSDSelector = {
    '0':'0',
    '1x375': '1x375 GB',
    '2x375': '2x375 GB',
    '3x375': '3x375 GB',
    '24x375': '24x375 GB'
}

const regionSelector = {
    uscentral1: 'us-central1',
    uswest1: 'us-west1',
    uswest2: 'us-west2'
}

const commitedSelector = {
    none: 'none',
    year: 'year',
    year3: 'year3'
}

describe('Estimation of an order of compute', () => {
    before(async()=>{
        googleMainPage = new mainpage();
        searchPageResult = new searchPage();
        pricingCloudPage = new pricingPage();
        titleComponent = new title();
        basePageComponent = new basePage();
        addEstForm = new addEstimateForm();
        instanceForm = new instanceFormElement();
        costDetailComponent = new costDetailElement();
        estimatePreviewComponent = new estimatePreviewElement();
        await googleMainPage.open();
    })

    describe('Navigate to the google cloud page',()=>{
        it('Should check google main page title',async()=>{
            const title = await titleComponent.title;
            expect(title).toHaveText(googleMainPageTitle);
    
            await saveScreenShot(`${screenShotsFilePath}/`,'openGoogleMainPage.png');
        })
    
        it('Should click in the search bar and fill with the desired input',async()=>{
            const findElement = await googleMainPage.FindElement;
            await findElement.click();
    
            const findElementText = await googleMainPage.FindInputText;
    
            await findElementText.setValue(searchInputText);
            expect(findElementText).toHaveText(searchInputText);
    
            
            await saveScreenShot(`${screenShotsFilePath}/`,'tryingToSearch.png');
            await basePageComponent.pressEnter();
        })
    
        it('Should check the title of the search page',async()=>{
            const title = await titleComponent.title;
            expect(title).toHaveText(searchTitleText);
            await saveScreenShot(`${screenShotsFilePath}/`,'searchPage.png');
        })
    
        it('Should select the pricing page and redirecto to pricing page',async()=>{
            const desiredPage = await searchPageResult.FindPage(searchParams);
            await desiredPage.click();
    
            await basePageComponent.waitPage(7);
            
            const title = await titleComponent.title;
            expect(title).toHaveText(googlePricingTitle);
            await saveScreenShot(`${screenShotsFilePath}/`,'pricingCalculatorPage.png');
            await pricingCloudPage.maximiseWindown();
        })
    })

    describe('Add a compute elements',()=>{
        testInstance.forEach(({name,numberOfInstances,operatingSystemValue,provisionModelSelection,machineFamilyValue,seriesMachineValue,machineTypeValue,addGPU,
            gpuModelValue,gpuNumberValue,localSSDValue,regionValue,commitedSelection})=>{
                describe(`Adding element ${name}`,()=>{
                    it('Should click the add estimate button and show the menu',async()=>{
                        const addEstimateBttn = pricingCloudPage.addEstimate;
                        await addEstimateBttn.scrollIntoView({ block: 'center', inline: 'center' })
                        await addEstimateBttn.click();
                
                        await pricingCloudPage.waitForPopup(7);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'addEstimateClicked.png');
                    })
                
                    it('Should select to add a compute item',async()=>{
                        const toAdd = addEstForm.formElement(elementToAdd);
                        await toAdd.scrollIntoView({ block: 'center', inline: 'center' })
                        toAdd.click();
                
                        await pricingCloudPage.waitForClosingPopup(7);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectCompute.png');
                    })
                
                    it('Should select a number of instances',async()=>{
                        const numberInstances = instanceForm.instanceForm('number');
                        await numberInstances.scrollIntoView({ block: 'center', inline: 'center' })
                        await numberInstances.setValue(numberOfInstances);
                
                        expect(numberInstances).toHaveText(numberOfInstances);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectNumberInstances.png');
                    })
                
                    it('Should select operating system',async()=>{
                
                        const operatingSystem = instanceForm.instanceForm('software');
                        await operatingSystem.scrollIntoView({ block: 'center', inline: 'center' })
                        await operatingSystem.click();
                
                        await instanceForm.waitForList('os',7);
            
                        const operationSystemSelection = instanceForm.operatingSystemList(operatingSystemValue);
                
                        await operationSystemSelection.click();
                
                        await instanceForm.waitForListVanish('os',7);
            
                        expect(operatingSystem).toHaveText(osSelector[operatingSystemValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectOperatingSystem.png');
                    })
                
                    it('Should select the provisioning model', async()=>{
                        const proivisionModel = instanceForm.provisionModel(provisionModelSelector[provisionModelSelection]);
                        await proivisionModel.scrollIntoView({ block: 'center', inline: 'center' })
                        const provisionInput = instanceForm.provisionModelInput(provisionModelSelector[provisionModelSelection]);
                        await proivisionModel.click();
                
                        expect(provisionInput).toHaveAttr('checked','');
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectOperatingSystem.png');
                    })
                
                    it('Should select the machine family', async()=>{
                        const machineFamily = instanceForm.instanceForm('machinefamily');
                        await machineFamily.scrollIntoView({ block: 'center', inline: 'center' })
                        await machineFamily.click();
                
                        await instanceForm.waitForList('machinefamily',7);
                        
                        const machineSystemList = instanceForm.machineFamilyList(machineFamilyValue);
                        await machineSystemList.click();
                
                        await instanceForm.waitForListVanish('machinefamily',7);
            
                        expect(machineFamily).toHaveText(machineTypeSelector[machineFamilyValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectMachineType.png');
                    })
                
                    it('Should select the machine series',async()=>{
                        const seriesMachine = instanceForm.instanceForm('machineseries');
                        await seriesMachine.scrollIntoView({ block: 'center', inline: 'center' })
                        await seriesMachine.click();
                    
                        await instanceForm.waitForList('serieslist',7);
                        
            
                        const machineSeriesList = instanceForm.seriesMachineList(seriesMachineValue);
                        await machineSeriesList.click();
            
                        await instanceForm.waitForListVanish('serieslist',7);
                        
                        expect(seriesMachine).toHaveText(seriesSelector[seriesMachineValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'seriesSelector.png');
                    })
            
                    it('Should select the machine type',async()=>{
                        const typeMachine = instanceForm.instanceForm('machinetype');
                        await typeMachine.scrollIntoView({ block: 'center', inline: 'center' })
                        await typeMachine.click();
                    
                        await instanceForm.waitForList('machinetypelist',7);
            
                        const machineTypeList = instanceForm.machineTypeList(machineTypeValue);
                        await machineTypeList.click();
            
                        await instanceForm.waitForListVanish('machinetypelist',7);
                
                        expect(typeMachine).toHaveText(typeMachineSelector[machineTypeValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'typeMachineSelector.png');
                    })
            
                    it('Should select the addGPU button if needed',async ()=>{
                        
                        const addGPUButt = instanceForm.instanceForm('addgpu');
                        const valueGPU = await addGPUButt.getAttribute('aria-checked');
                        await addGPUButt.scrollIntoView({ block: 'center', inline: 'center' })
            
                        if(valueGPU != addGPU){
                            await addGPUButt.click();
                            await saveScreenShot(`${screenShotsFilePath}/${name}/`,'GpuChange.png');
                        }
                        const GPUbutt = instanceForm.instanceForm('addgpu');
                        expect(GPUbutt).toHaveAttr('aria-checked',addGPU);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'checkGPU.png');
                    })
            
                    it('Should select GPU model in case GPU is selected',async ()=>{
                        if(addGPU == 'true'){
                            const gpuModel = instanceForm.instanceForm('gpumodel');
                            await gpuModel.scrollIntoView({ block: 'center', inline: 'center' })
                            await gpuModel.click();
            
                            await instanceForm.waitForList('gpumodel',7);
                            const gpuModelList = await instanceForm.gpumodelSelectionList(gpuModelValue);
                            
                            await gpuModelList.click();
            
                            await instanceForm.waitForListVanish('gpumodel',7);
                            
                            expect(gpuModel).toHaveText(gpuModelSelector[gpuModelValue]);
            
                            await saveScreenShot(`${screenShotsFilePath}/${name}/`,'gpuModelSelection.png');
                        }
                    })
            
                    it('Should select number of GPU in case GPU is selected',async ()=>{
                        if(addGPU == 'true'){
                            const GPUNumber = instanceForm.instanceForm('numbergpu');
                            await GPUNumber.click();
            
                            await instanceForm.waitForList('numbergpu',7);
                            const gpuNumberList = await instanceForm.numberGpuSelectionList(gpuNumberValue);
                            await gpuNumberList.click();
            
                            await instanceForm.waitForListVanish('numbergpu',7);
            
                            expect(GPUNumber).toHaveText(gpuNumberselector[gpuNumberValue]);
            
                            await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectNumberGPU.png');
                        }
                    })
            
                    it('Should select the local ssd',async()=>{
                        const localSSD = instanceForm.instanceForm('localssd');
                        await localSSD.scrollIntoView({ block: 'center', inline: 'center' })
                        await localSSD.click();
                    
                        await instanceForm.waitForList('localssd',7);
            
                        // const localSSDList = await instanceForm.localSSDSelectionList(localSSDValue);
                        const selector = {
                            '0': 0,
                            '1x375': 1,
                            '2x375': 2,
                            '3x375': 3,
                            '24x375': 24,
                        }
                        const localSSDList = await $(`//ul[contains(@aria-label,"Local SSD")]//li[@data-value="${selector[localSSDValue]}"]`)
                        await localSSDList.scrollIntoView({ block: 'center', inline: 'center' })
                        await localSSDList.click();
            
                        await instanceForm.waitForListVanish('localssd',7);
                
                        expect(localSSD).toHaveText(localSSDSelector[localSSDValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'localSSDSelector.png');
                    })
            
                    it('Should select the region',async()=>{
                        const region = instanceForm.instanceForm('region');
                        await region.scrollIntoView({ block: 'center', inline: 'center' })
                        await region.click();
                    
                        await instanceForm.waitForList('region',7);
            
                        const regionList = instanceForm.regionSelectionList(regionValue);
                        await regionList.click();
            
                        await instanceForm.waitForListVanish('region',7);
                
                        expect(region).toHaveText(regionSelector[regionValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'regionSelector.png');
                    })
            
                    it('Should select commited use discount options', async()=>{
                        const commitedOptions = instanceForm.commitedOptions(commitedSelector[commitedSelection]);
                        const commitedInput = instanceForm.commitedOptionsInput(commitedSelector[commitedSelection]);
                        await commitedOptions.scrollIntoView({ block: 'center', inline: 'center' })
                        await commitedOptions.click();
                
                        expect(commitedInput).toHaveAttr('checked','');
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectCommitedOptions.png');
                    })
            })
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
            await browser.switchWindow('https://cloud.google.com/products/calculator/estimate-preview')
            await saveScreenShot(`${screenShotsFilePath}/`,'summaryEstimation.png');
        })

        it('Should compare the total estimated cost on new page and the old page',async()=>{
            const totalEstimated = estimatePreviewComponent.estimatedCost;

            expect(totalEstimated).toHaveText(totalCost);
            await saveScreenShot(`${screenShotsFilePath}/`,'checkingValues.png');
        })

    })

    after(async()=>{
        googleMainPage = null;
        searchPageResult = null;
        pricingCloudPage = null;
        titleComponent = null;
        basePageComponent = null;
        addEstForm = null;
        instanceForm = null;
        costDetailComponent = null;
        estimatePreviewComponent = null;
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