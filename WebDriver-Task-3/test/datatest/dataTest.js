const createInstance = [
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
},
{
    name: 'MySecondInstance',
    numberOfInstances : 2,
    operatingSystemValue : 'paidubuntu',
    provisionModelSelection : 'spot',
    machineFamilyValue : 'generalpurpose',
    seriesMachineValue : 'n2',
    machineTypeValue : 'n2standar2',
    addGPU : 'false',
    gpuModelValue : 'nvidiateslav100',
    gpuNumberValue : '1',
    localSSDValue : '3x375',
    regionValue : 'uscentral1',
    commitedSelection : 'year3',
},
]

module.exports = createInstance;