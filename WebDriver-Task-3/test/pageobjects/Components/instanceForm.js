class instanceForm{

    get rootEl(){
        return $('//div[contains(@class,"vHartc")]');
    }

    instanceForm(param){
        const selector = {
            number: '//input[contains(@jsname,"YPqjbf")]',
            software: '//div[contains(@class,"O1htCb-H9tDt PPUDSe t8xIwc")]',
            model: '//div[contains(@class,"kqQzpb YgByBe")]',
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
        return this.rootEl.$(`${selector[param]}`)
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
        return this.rootEl.$(`${selector[param]}`)
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
            nvidiateslat4: 'nvidia-tesla-t4"'
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
            '0': '0',
            '1x375': '1',
            '2x375': '2',
            '3x375': '3',
            '24x375': '24',
        }
        return this.selectionList('localssd').$(`//li[@data-value=${selector[param]}]`)
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
            os: this.selectionList('osList').waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: `os list did not show up`, interval: 500 }),
            machinefamily: this.selectionList('familyList').waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: `machine family list did not show up`, interval: 500 }),
            serieslist: this.selectionList('seriesList').waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: `series list did not show up`, interval: 500 }),
            machinetypelist: this.selectionList('typeMachineList').waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: `machine type list did not show up`, interval: 500 }),
            gpumodel: this.selectionList('gpuModelList').waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: `gpu model list did not show up`, interval: 500 }),
            numbergpu: this.selectionList('numberGpuList').waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: `number of gpu list did not show up`, interval: 500 }),
            localssd: this.selectionList('localssd').waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: `local ssd list did not show up`, interval: 500 }),
            region: this.selectionList('region').waitForDisplayed({ timeout: time*1000, reverse: false, timeoutMsg: `region list did not show up`, interval: 500 })
        }
        return selector[param]
    }

    waitForListVanish(param,time){
        const selector = {
            os: this.selectionList('osList').waitForDisplayed({ timeout: time*1000, reverse: true, timeoutMsg: `os list did not vanish`, interval: 500 }),
            machinefamily: this.selectionList('familyList').waitForDisplayed({ timeout: time*1000, reverse: true, timeoutMsg: `machine family list did not vanish`, interval: 500 }),
            serieslist: this.selectionList('seriesList').waitForDisplayed({ timeout: time*1000, reverse: true, timeoutMsg: `series list did not vanish`, interval: 500 }),
            machinetypelist: this.selectionList('typeMachineList').waitForDisplayed({ timeout: time*1000, reverse: true, timeoutMsg: `machine type list did not vanish`, interval: 500 }),
            gpumodel: this.selectionList('gpuModelList').waitForDisplayed({ timeout: time*1000, reverse: true, timeoutMsg: `gpu model list did not vanish`, interval: 500 }),
            numbergpu: this.selectionList('numberGpuList').waitForDisplayed({ timeout: time*1000, reverse: true, timeoutMsg: `number of gpu list did not vanish`, interval: 500 }),
            localssd: this.selectionList('localssd').waitForDisplayed({ timeout: time*1000, reverse: true, timeoutMsg: `local ssd list did not vanish`, interval: 500 }),
            region: this.selectionList('region').waitForDisplayed({ timeout: time*1000, reverse: true, timeoutMsg: `region list did not vanish`, interval: 500 })
        }
        return selector[param]
    }
}

module.exports = instanceForm