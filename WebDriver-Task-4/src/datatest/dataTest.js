let environmet = process.env.NODE_ENV;

const instances = {
    testing: 
{
    name: 'MySecondInstance',
    numberOfInstances : 2,
    operatingSystemValue : 'paidubuntu',
    provisionModelSelection : 'spot',
    machineFamilyValue : 'generalpurpose',
    seriesMachineValue : 'n2',
    machineTypeValue : 'n2standar2',
    addGPU : 'false',
    localSSDValue : '3x375',
    regionValue : 'uscentral1',
    commitedSelection : 'year3',
},
    production:
        {
        name: 'MyFirstInstance',
        numberOfInstances : 4,
        operatingSystemValue : 'free',
        provisionModelSelection : 'regular',
        machineFamilyValue : 'generalpurpose',
        seriesMachineValue : 'n1',
        machineTypeValue : 'n1standar1',
        addGPU : 'true',
        gpuModelValue : 'nvidiateslav100',
        gpuNumberValue : '2',
        localSSDValue : '3x375',
        regionValue : 'uswest1',
        commitedSelection : 'year',
    }
}

const createInstance = instances[environmet];

module.exports = createInstance;