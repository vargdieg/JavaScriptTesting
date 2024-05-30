const { expect } = require('@wdio/globals');
const { existsSync, mkdirSync } = require('fs');

const addItemGroup = require('../PageObject/Components/addItemGroupForm.js');
const instanceFormElement = require('../PageObject/Components/instanceForm.js');
const costDetailElement = require('../PageObject/Components/costsDetails.js');

const mainpage = require('../PageObject/pages/googleMainPage.js');
const searchPage = require('../PageObject/pages/googleCloudSearchPage.js');
const pricingPage = require('../PageObject/pages/googlePricingPage.js');
const estimatePreview = require('../PageObject/pages/googleEstimatePreviewPage.js');

const testInstance = require('../datatest/dataTest.js');

let environmet = process.env.NODE_ENV;
const screenShotsFilePath = `./screenshots/${environmet}`;

let googleMainPage = '';
let searchPageResult = '';
let pricingCloudPage = '';
let estimatePreviewPage = '';

let addItemGroupForm = '';
let pricingInstanceForm = '';
let costDetailComponent = '';

const googleMainPageTitle = 'Servicios de cloud computing | Google Cloud';
const searchInputText = 'Google Cloud Platform Pricing Calculator';
const searchTitleText = `Resultados de la búsqueda de "${searchInputText}"  |  Google Cloud`;
const searchParams = 'Google Cloud Pricing Calculator';

const googlePricingTitle = 'Calculadora de precios de Google Cloud';

const elementToAdd = 'computeEngine';

let totalCost = '';

//This selectors are used for value validation, right now it is being validate with the text on the inputs selectors
//Buttons are being validated with a property called checked

const osSelector = {
    free: 'Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)',
    paidubuntu: 'Paid: Ubuntu Pro',
    paidwindows2012: 'Paid: Windows Server 2012 R2, Windows Server 2016, Windows Server 2019, Windows Server (2004, 20H2)'
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

describe('Estimation of an order of compute', () => {
    before(async()=>{
        googleMainPage = new mainpage();
        searchPageResult = new searchPage();
        pricingCloudPage = new pricingPage();
        estimatePreviewPage = new estimatePreview();
        addItemGroupForm = new addItemGroup();
        pricingInstanceForm = new instanceFormElement();
        costDetailComponent = new costDetailElement();
    
        await googleMainPage.open();
    })

    describe('Navigate to the google cloud page',()=>{
        it('Should check google main page title',async()=>{
            const title = await googleMainPage.title;
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
            await googleMainPage.pressEnter();
        })
    
        it('Should check the title of the search page',async()=>{
            const title = await searchPageResult.title;
            expect(title).toHaveText(searchTitleText);
            await saveScreenShot(`${screenShotsFilePath}/`,'searchPage.png');
        })
    
        it('Should select the pricing page and redirecto to pricing page',async()=>{
            const desiredPage = await searchPageResult.FindPage(searchParams);
            await desiredPage.click();
    
            await searchPageResult.waitPage(7);
            
            const title = await pricingCloudPage.title;
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

                        const addEstimateBttn = await pricingCloudPage.addEstimate;
                        await (await addEstimateBttn).scrollIntoView({ block: 'center', inline: 'center' })
                        await (await addEstimateBttn).click();

                        await pricingCloudPage.waitForPopup(7);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'addEstimateClicked.png');
                    })
                
                    it('Should select to add a compute item',async()=>{
                        const toAdd = await addItemGroupForm.formElement(elementToAdd);
                        await toAdd.scrollIntoView({ block: 'center', inline: 'center' })
                        toAdd.click();
                
                        await pricingCloudPage.waitForClosingPopup(7);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectCompute.png');
                    })
                
                    it('Should select a number of instances',async()=>{
                        const numberInstances = await pricingInstanceForm.instanceForm('number');
                        await numberInstances.scrollIntoView({ block: 'center', inline: 'center' })
                        await numberInstances.setValue(numberOfInstances);
                
                        expect(numberInstances).toHaveText(numberOfInstances);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectNumberInstances.png');
                    })
                
                    it('Should select operating system',async()=>{
                
                        const operatingSystem = await pricingInstanceForm.instanceForm('software');
                        await operatingSystem.scrollIntoView({ block: 'center', inline: 'center' })
                        await operatingSystem.click();
                
                        await pricingInstanceForm.waitForList('os',7);
            
                        const operationSystemSelection = pricingInstanceForm.operatingSystemList(operatingSystemValue);
                
                        await operationSystemSelection.click();
                
                        await pricingInstanceForm.waitForListVanish('os',7);
            
                        const operatingSystemText = await pricingInstanceForm.instanceFormText('software');

                        expect(operatingSystemText).toHaveText(osSelector[operatingSystemValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectOperatingSystem.png');
                    })
                
                    it('Should select the provisioning model', async()=>{
                        const proivisionModel = await pricingInstanceForm.provisionModel(provisionModelSelection);
                        await proivisionModel.scrollIntoView({ block: 'center', inline: 'center' })

                        const provisionInput = await pricingInstanceForm.provisionModelInput(provisionModelSelection);
                        await proivisionModel.click();
                
                        expect(provisionInput).toHaveAttr('checked','');
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectProvisionModel.png');
                    })
                
                    it('Should select the machine family', async()=>{
                        const machineFamily = pricingInstanceForm.instanceForm('machinefamily');
                        await machineFamily.scrollIntoView({ block: 'center', inline: 'center' })
                        await machineFamily.click();
                
                        await pricingInstanceForm.waitForList('machinefamily',7);
                        
                        const machineSystemList = pricingInstanceForm.machineFamilyList(machineFamilyValue);
                        await machineSystemList.click();
                
                        await pricingInstanceForm.waitForListVanish('machinefamily',7);

                        const machineFamilyText = await pricingInstanceForm.instanceFormText('software');
            
                        expect(machineFamilyText).toHaveText(machineTypeSelector[machineFamilyValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectMachineType.png');
                    })
                
                    it('Should select the machine series',async()=>{
                        const seriesMachine = await pricingInstanceForm.instanceForm('machineseries');
                        await seriesMachine.scrollIntoView({ block: 'center', inline: 'center' })
                        await seriesMachine.click();
                    
                        await pricingInstanceForm.waitForList('serieslist',7);
                        
            
                        const machineSeriesList = await pricingInstanceForm.seriesMachineList(seriesMachineValue);
                        await machineSeriesList.click();
            
                        await pricingInstanceForm.waitForListVanish('serieslist',7);

                        const seriesMachineText = await pricingInstanceForm.instanceFormText('machineseries');
                        
                        expect(seriesMachineText).toHaveText(seriesSelector[seriesMachineValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'seriesSelector.png');
                    })
            
                    it('Should select the machine type',async()=>{
                        const typeMachine = await pricingInstanceForm.instanceForm('machinetype');
                        await typeMachine.scrollIntoView({ block: 'center', inline: 'center' })
                        await typeMachine.click();
                    
                        await pricingInstanceForm.waitForList('machinetypelist',7);
            
                        const machineTypeList = pricingInstanceForm.machineTypeList(machineTypeValue);
                        await machineTypeList.click();
            
                        await pricingInstanceForm.waitForListVanish('machinetypelist',7);
                        const typeMachineText = await pricingInstanceForm.instanceFormText('machineseries');
                
                        expect(typeMachineText).toHaveText(typeMachineSelector[machineTypeValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'typeMachineSelector.png');
                    })
            
                    it('Should select the addGPU button if needed',async ()=>{
                        
                        const addGPUButt = await pricingInstanceForm.instanceForm('addgpu');
                        const valueGPU = await addGPUButt.getAttribute('aria-checked');
                        await addGPUButt.scrollIntoView({ block: 'center', inline: 'center' })
            
                        if(valueGPU != addGPU){
                            await addGPUButt.click();
                            await saveScreenShot(`${screenShotsFilePath}/${name}/`,'GpuChange.png');
                        }
                        const GPUbutt = pricingInstanceForm.instanceForm('addgpu');
                        expect(GPUbutt).toHaveAttr('aria-checked',addGPU);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'checkGPU.png');
                    })
            
                    it('Should select GPU model in case GPU is selected',async ()=>{
                        if(addGPU == 'true'){
                            const gpuModel = await pricingInstanceForm.instanceForm('gpumodel');
                            await gpuModel.scrollIntoView({ block: 'center', inline: 'center' })
                            await gpuModel.click();
            
                            await pricingInstanceForm.waitForList('gpumodel',7);
                            const gpuModelList = await pricingInstanceForm.gpumodelSelectionList(gpuModelValue);
                            
                            await gpuModelList.click();
            
                            await pricingInstanceForm.waitForListVanish('gpumodel',7);
                            const gpuModelText = await pricingInstanceForm.instanceFormText('gpumodel');
                            
                            expect(gpuModelText).toHaveText(gpuModelSelector[gpuModelValue]);
            
                            await saveScreenShot(`${screenShotsFilePath}/${name}/`,'gpuModelSelection.png');
                        }
                    })
            
                    it('Should select number of GPU in case GPU is selected',async ()=>{
                        if(addGPU == 'true'){
                            const GPUNumber = await pricingInstanceForm.instanceForm('numbergpu');
                            await GPUNumber.click();
            
                            await pricingInstanceForm.waitForList('numbergpu',7);
                            const gpuNumberList = await pricingInstanceForm.numberGpuSelectionList(gpuNumberValue);
                            await gpuNumberList.click();
            
                            await pricingInstanceForm.waitForListVanish('numbergpu',7);
            
                            const numberGPUText = await pricingInstanceForm.instanceFormText('numbergpu');

                            expect(numberGPUText).toHaveText(gpuNumberselector[gpuNumberValue]);
            
                            await saveScreenShot(`${screenShotsFilePath}/${name}/`,'SelectNumberGPU.png');
                        }
                    })
            
                    it('Should select the local ssd',async()=>{
                        const localSSD = await pricingInstanceForm.instanceForm('localssd');
                        await localSSD.scrollIntoView({ block: 'center', inline: 'center' })
                        await localSSD.click();
                    
                        await pricingInstanceForm.waitForList('localssd',7);
                        
                        const localSSDList = await pricingInstanceForm.localSSDSelectionList(localSSDValue);
                        await (await localSSDList).scrollIntoView({ block: 'center', inline: 'center' })
                        await localSSDList.click();
            
                        await pricingInstanceForm.waitForListVanish('localssd',7);
                
                        const localSSDText = await pricingInstanceForm.instanceFormText('localssd');

                        expect(localSSDText).toHaveText(localSSDSelector[localSSDValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'localSSDSelector.png');
                    })
            
                    it('Should select the region',async()=>{
                        const region = pricingInstanceForm.instanceForm('region');
                        await region.scrollIntoView({ block: 'center', inline: 'center' })
                        await region.click();
                    
                        await pricingInstanceForm.waitForList('region',7);
            
                        const regionList = pricingInstanceForm.regionSelectionList(regionValue);
                        await regionList.click();
            
                        await pricingInstanceForm.waitForListVanish('region',7);

                        const regionText = await pricingInstanceForm.instanceFormText('region');
                
                        expect(regionText).toHaveText(regionSelector[regionValue]);
                        await saveScreenShot(`${screenShotsFilePath}/${name}/`,'regionSelector.png');
                    })
            
                    it('Should select commited use discount options', async()=>{
                        const commitedOptions = pricingInstanceForm.commitedOptions(commitedSelection);
                        const commitedInput = pricingInstanceForm.commitedOptionsInput(commitedSelection);
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

            await estimatePreviewPage.switchToEstimate();
            await saveScreenShot(`${screenShotsFilePath}/`,'summaryEstimation.png');
        })

        it('Should compare the total estimated cost on new page and the old page',async()=>{
            const totalEstimated = await estimatePreviewPage.estimatedCost;

            expect(totalEstimated).toHaveText(totalCost);
            await saveScreenShot(`${screenShotsFilePath}/`,'checkingValues.png');
        })

    })

    after(async()=>{
        googleMainPage = null;
        searchPageResult = null;
        pricingCloudPage = null;
        estimatePreviewPage = null;
        addItemGroupForm = null;
        pricingInstanceForm = null;
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