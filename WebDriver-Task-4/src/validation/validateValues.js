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
    nvidiateslav100: 'NVIDIA V100',
    nvidiateslat4: 'NVIDIA T4'
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
    uscentral1: 'Iowa (us-central1)',
    uswest1: 'Oregon (us-west1)',
    uswest2: 'Los Angeles (us-west2)'
}

module.exports = {osSelector,machineTypeSelector,seriesSelector,
    typeMachineSelector,gpuModelSelector,gpuNumberselector,localSSDSelector,regionSelector}