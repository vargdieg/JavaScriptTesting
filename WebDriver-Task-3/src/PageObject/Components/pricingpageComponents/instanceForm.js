const browseutils = require('../../../utils/browserUtils.js');

class instanceForm{

    get instanceFormRoot(){
        return $('//div[contains(@class,"vHartc")]');
    }

    instanceForm(param){
        const selector = {
            number: '//input[contains(@jsname,"YPqjbf")]',
            software: '//div[contains(@data-field-type,"106")]',
            model: '//div[contains(@data-field-type,"107")]',
            machinefamily: '//div[contains(@class,"qPg9F")]//div[contains(@class,"LHK0xb")]//div[contains(@jsname,"Wsw6tc")]',
            machineseries: '//div[contains(@class,"qPg9F")]//div[contains(@class,"LHK0xb")]//div[contains(@jsname,"vGGDlb")]',
            machinetype: '//div[contains(@class,"qPg9F")]//div[contains(@class,"LHK0xb")]//div[contains(@jsname,"kgDJk")]',
            addgpu: '//button[contains(@aria-label,"Add GPUs")]',
            gpumodel: '//div[contains(@data-field-type,"158")]',
            numbergpu: '//div[contains(@data-field-type,"174")]',
            localssd: '//div[contains(@data-field-type,"180")]',
            region: '//div[contains(@data-field-type,"115")]',
            commitusage: '//div[contains(@class,"Iykrdb")]//div[contains(@class,"c0GfYc") and contains(@jsname,"U7okFc")]'
        }
        return this.instanceFormRoot.$(`${selector[param]}`)
    }

    async instanceFormText(param){
        const selector = {
            software: '//div[contains(@class,"vHartc")]//div[contains(@data-field-type,"106")]//span[contains(@jsname,"Fb0Bif")]',
            machinefamily: '//div[contains(@class,"vHartc")]//div[contains(@class,"qPg9F")]//div[contains(@class,"LHK0xb")]//div[contains(@jsname,"Wsw6tc")]//span[contains(@jsname,"Fb0Bif")]',
            machineseries: '//div[contains(@class,"vHartc")]//div[contains(@class,"qPg9F")]//div[contains(@class,"LHK0xb")]//div[contains(@jsname,"vGGDlb")]//span[contains(@jsname,"Fb0Bif")]',
            machinetype: '//div[contains(@class,"vHartc")]//div[contains(@class,"qPg9F")]//div[contains(@class,"LHK0xb")]//div[contains(@jsname,"kgDJk")]//span[contains(@jsname,"Fb0Bif")]',
            gpumodel: '//div[contains(@class,"vHartc")]//div[contains(@data-field-type,"158")]//span[contains(@jsname,"Fb0Bif")]',
            numbergpu: '//div[contains(@class,"vHartc")]//div[contains(@data-field-type,"174")]//span[contains(@jsname,"Fb0Bif")]',
            localssd: '//div[contains(@class,"vHartc")]//div[contains(@data-field-type,"180")]//span[contains(@jsname,"Fb0Bif")]',
            region: '//div[contains(@class,"vHartc")]//div[contains(@data-field-type,"115")]//span[contains(@jsname,"Fb0Bif")]',
        }
        return $(`${selector[param]}`)
    }

    provisionModel(param){
        const selector = {
            regular: 'Regular',
            spot: 'Spot (Preemptible VM)'
        }
        return this.instanceForm('model').$(`//label[contains(text(),"${selector[param]}")]`)
    }

    provisionModelInput(param){
        const selector = {
            regular: 'regular',
            spot: 'spot'
        }
        return this.instanceForm('model').$(`//input[contains(@id,"${selector[param]}")]`)
    }

    commitedOptions(param){
        const selector = {
            none: 'None',
            year: '1 year',
            year3: '3 years'
        }
        return this.instanceForm('commitusage').$(`//label[contains(text(),"${selector[param]}")]`)
    }

    commitedOptionsInput(param){
        const selector = {
            none: 'none',
            year: '1-year',
            year3: '3-year'
        }
        return this.instanceForm('model').$(`//input[contains(@id,"${selector[param]}")]`)
    }

    selectionList(param){
        const selector = {
            osList: '//ul[contains(@aria-label,"Operating System / Software")]',
            familyList: '//ul[contains(@aria-label,"Machine Family")]',
            seriesList: '//ul[contains(@aria-label,"Series")]',
            typeMachineList: '//ul[contains(@aria-label,"Machine type")]',
            gpuModelList: '//ul[contains(@aria-label,"GPU Model")]',
            numberGpuList: '//ul[contains(@aria-label,"Number of GPUs")]',
            localssd: '//ul[contains(@aria-label,"Local SSD")]',
            region: '//ul[contains(@aria-label,"Region")]'
        }
        return this.instanceFormRoot.$(`${selector[param]}`)
    }

    operatingSystemList(param){
        const selector = {
            free: 'free-debian-centos-coreos-ubuntu-or-byol-bring-your-own-license',
            paidubuntu: 'paid-ubuntu-pro',
            paidwindows2012: 'paid-windows-server-2012-r2-windows-server-2016-windows-server-2019-windows-server-2004-20h2'
        }
        return this.selectionList('osList').$(`//li[contains(@data-value,"${selector[param]}")]`)
    }

    machineFamilyList(param){
        const selector = {
            generalpurpose :'general-purpose',
            computeoptimized:'compute-optimized',
            memoryoptimized:'memory-optimized'
        }
        return this.selectionList('familyList').$(`//li[contains(@data-value,"${selector[param]}")]`)
    }

    seriesMachineList(param){
        const selector = {
            n1: 'n1',
            n2: 'n2',
            e2: 'e2'
        }
        return this.selectionList('seriesList').$(`//li[contains(@data-value,"${selector[param]}")]`)
    }

    machineTypeList(param){
        const selector = {
            n1standar1: 'n1-standard-1',
            n1standar2: 'n1-standard-2',
            n1standar4: 'n1-standard-4',
            n2standar2: 'n2-standard-2'
        }
        return this.selectionList('typeMachineList').$(`//li[contains(@data-value,"${selector[param]}")]`)
    }

    gpumodelSelectionList(param){
        const selector = {
            nvidiateslap100: 'nvidia-tesla-p100',
            nvidiateslap4: 'nvidia-tesla-p4',
            nvidiateslav100: 'nvidia-tesla-v100',
            nvidiateslat4: 'nvidia-tesla-t4'
        }
        return this.selectionList('gpuModelList').$(`//li[contains(@data-value,"${selector[param]}")]`)
    }

    numberGpuSelectionList(param){
        const selector = {
            '1': '1',
            '2': '2',
            '4': '4',
            '8': '8'
        }
        return this.selectionList('numberGpuList').$(`//li[@data-value=${selector[param]}]`);
    }

    localSSDSelectionList(param){
        const selector = {
            '0': 0,
            '1x375': 1,
            '2x375': 2,
            '3x375': 3,
            '24x375': 24,
        }
        return $(`//ul[contains(@aria-label,"Local SSD")]//li[@data-value="${selector[param]}"]`)
    }

    regionSelectionList(param){
        const selector = {
            uscentral1: 'us-central1',
            uswest1: 'us-west1',
            uswest2: 'us-west2'
        }
        return this.selectionList('region').$(`//li[contains(@data-value,"${selector[param]}")]`)
    }

    waitForList(param,time){
        const selector = {
            os: browseutils.waitForDisplay(this.selectionList('osList'),time,`os list did not show up`),
            machinefamily: browseutils.waitForDisplay(this.selectionList('familyList'),time,`machine family list did not show up`),
            serieslist: browseutils.waitForDisplay(this.selectionList('seriesList'),time,`series list did not show up`),
            machinetypelist: browseutils.waitForDisplay(this.selectionList('typeMachineList'),time,`machine type list did not show up`),
            gpumodel: browseutils.waitForDisplay(this.selectionList('gpuModelList'),time,`gpu model list did not show up`),
            numbergpu: browseutils.waitForDisplay(this.selectionList('numberGpuList'),time,`number of gpu list did not show up`),
            localssd: browseutils.waitForDisplay(this.selectionList('localssd'),time,`local ssd list did not show up`),
            region: browseutils.waitForDisplay(this.selectionList('region'),time,`region list did not show up`)
        }
        return selector[param]
    }

    waitForListVanish(param,time){
        const selector = {
            os: browseutils.waitForVanish(this.selectionList('osList'),time,`os list did not vanish`),
            machinefamily: browseutils.waitForVanish(this.selectionList('familyList'),time,`machine family list did not vanish`),
            serieslist: browseutils.waitForVanish(this.selectionList('seriesList'),time,`series list did not vanish`),
            machinetypelist: browseutils.waitForVanish(this.selectionList('typeMachineList'),time,`machine type list did not vanish`),
            gpumodel: browseutils.waitForVanish(this.selectionList('gpuModelList'),time,`gpu model list did not vanish`),
            numbergpu: browseutils.waitForVanish(this.selectionList('numberGpuList'),time,`number of gpu list did not vanish`),
            localssd: browseutils.waitForVanish(this.selectionList('localssd'),time,`local ssd list did not vanish`),
            region: browseutils.waitForVanish(this.selectionList('region'),time,`region list did not vanish`)
        }
        return selector[param]
    }

    async changeInstancesNumber(desiredNumberOfInstances){
        const numberInstances = await this.instanceForm('number');
        await numberInstances.scrollIntoView({ block: 'center', inline: 'center' })
        await numberInstances.setValue(desiredNumberOfInstances);
    }

    async verifyNumberOfInstances(expectedValue){
        const numberInstances = await this.instanceForm('number');
        await expect(numberInstances).toHaveValue(`${expectedValue}`);
    }

    async changeOperatingSystem(newOsValue,timeout = 7){
        const operatingSystem = await this.instanceForm('software');
        await operatingSystem.scrollIntoView({ block: 'center', inline: 'center' });
        await operatingSystem.click();
        await this.waitForList('os',timeout);
        const operationSystemSelection = await this.operatingSystemList(newOsValue);
        await operationSystemSelection.click();
        await this.waitForListVanish('os',timeout);
    }

    async verifyValueOperatingSystem(expectedValue){
        const operatingSystemText = await this.instanceFormText('software');
        await expect(operatingSystemText).toHaveText(expectedValue);
    }

    async changeProvisionModel(newProvisionValue){
        const proivisionModel = await this.provisionModel(newProvisionValue);
        await proivisionModel.scrollIntoView({ block: 'center', inline: 'center' })
        await proivisionModel.click();
    }

    async checkProvisionModelSelected(expectedProvisionChecked){
        const provisionInput = await this.provisionModelInput(expectedProvisionChecked);
        await expect(provisionInput).toHaveAttr('checked','true');
    }

    async changeMachineFamily(newMachineFamily){
        const machineFamily = this.instanceForm('machinefamily');
        await machineFamily.scrollIntoView({ block: 'center', inline: 'center' })
        await machineFamily.click();

        await this.waitForList('machinefamily',7);
        
        const machineSystemList = this.machineFamilyList(newMachineFamily);
        await machineSystemList.click();

        await this.waitForListVanish('machinefamily',7);
    }

    async checkMachineFamilySelection(expectedMachineFamilyValue){
        const machineFamilyText = await this.instanceFormText('machinefamily');

        await expect(machineFamilyText).toHaveText(expectedMachineFamilyValue);
    }

    async changeMachineSeries(newSeriesMachineValue){
        const seriesMachine = await this.instanceForm('machineseries');
        await seriesMachine.scrollIntoView({ block: 'center', inline: 'center' })
        await seriesMachine.click();
    
        await this.waitForList('serieslist',7);
        const machineSeriesList = await this.seriesMachineList(newSeriesMachineValue);
        await machineSeriesList.click();

        await this.waitForListVanish('serieslist',7);
    }

    async checkMachineSeriesSelection(expectedSeriesMachineValue){
        const seriesMachineText = await this.instanceFormText('machineseries');
        
        await expect(seriesMachineText).toHaveText(expectedSeriesMachineValue);
    }

    async changeMachineType(newMachineTypeValue){
        const typeMachine = await this.instanceForm('machinetype');
        await typeMachine.scrollIntoView({ block: 'center', inline: 'center' })
        await typeMachine.click();
    
        await this.waitForList('machinetypelist',7);

        const machineTypeList = this.machineTypeList(newMachineTypeValue);
        await machineTypeList.click();

        await this.waitForListVanish('machinetypelist',7);
    }

    async checkMachineTypeSelection(expectedMachineType){
        const typeMachineText = await this.instanceFormText('machinetype');

        await expect(typeMachineText).toHaveText(expectedMachineType);
    }

    async selectGPUButton(buttonValue){
        const addGPUButt = await this.instanceForm('addgpu');
        const valueGPU = await addGPUButt.getAttribute('aria-checked');
        await addGPUButt.scrollIntoView({ block: 'center', inline: 'center' })

        if(valueGPU != buttonValue){
            await addGPUButt.click();
        }
    }

    async checkGPUButton(expectedButtonValue){
        const GPUbutt = this.instanceForm('addgpu');
        await expect(GPUbutt).toHaveAttr('aria-checked',expectedButtonValue);
    }

    async changeGPUModel(newGPUModelValue){
        const gpuModel = await this.instanceForm('gpumodel');
        await gpuModel.scrollIntoView({ block: 'center', inline: 'center' })
        await gpuModel.click();
        await this.waitForList('gpumodel',7);
        const gpuModelList = await this.gpumodelSelectionList(newGPUModelValue);
        
        await gpuModelList.click();
        await this.waitForListVanish('gpumodel',7);
    }

    async checkGPUModel(expectedGPUModelValue){
        const gpuModelText = await this.instanceFormText('gpumodel');
        await expect(gpuModelText).toHaveText(expectedGPUModelValue);
    }

    async changeNumberGPU(newNumberGpu){
        const GPUNumber = await this.instanceForm('numbergpu');
        await GPUNumber.click();
        await this.waitForList('numbergpu',7);
        const gpuNumberList = await this.numberGpuSelectionList(newNumberGpu);
        await gpuNumberList.click();
        await this.waitForListVanish('numbergpu',7);
    }

    async checkNumberGPU(expectedNumberGpu){
        const numberGPUText = await this.instanceFormText('numbergpu');
        await expect(numberGPUText).toHaveText(expectedNumberGpu);
    }

    async changeLocalSSD(newLocalSSDValue){
        const localSSD = await this.instanceForm('localssd');
        await localSSD.scrollIntoView({ block: 'center', inline: 'center' })
        await localSSD.click();
        await this.waitForList('localssd',7);
        const localSSDList = await this.localSSDSelectionList(newLocalSSDValue);
        await (await localSSDList).scrollIntoView({ block: 'center', inline: 'center' })
        await localSSDList.click();
        await this.waitForListVanish('localssd',7);
    }

    async checkLocalSSD(expectedLocalSSDValue){
        const localSSDText = await this.instanceFormText('localssd')
        await expect(localSSDText).toHaveText(expectedLocalSSDValue);
    }

    async changeRegion(newRegionValue){
        const region = this.instanceForm('region');
        await region.scrollIntoView({ block: 'center', inline: 'center' })
        await region.click();
    
        await this.waitForList('region',7);

        const regionList = this.regionSelectionList(newRegionValue);
        await regionList.click();

        await this.waitForListVanish('region',7);
    }

    async checkRegion(expectedRegionValue){
        const regionText = await this.instanceFormText('region');

        await expect(regionText).toHaveText(expectedRegionValue);
    }

    async changeCommitedOptions(newCommitedValue){
        const commitedOptions = this.commitedOptions(newCommitedValue);
        await commitedOptions.scrollIntoView({ block: 'center', inline: 'center' })
        await commitedOptions.click();
    }

    async checkCommitedOptions(expectedCommitedValue){
        const commitedInput = this.commitedOptionsInput(expectedCommitedValue);
        await expect(commitedInput).toHaveAttr('checked','true');
    }

}

module.exports = instanceForm;