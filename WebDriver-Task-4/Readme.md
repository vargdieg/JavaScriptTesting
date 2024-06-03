# Index WebDriver-Task-4

1. [Introduction](#unittestingframeworks-task1)
2. [Dependency installation](#dependency-installation)
3. [Configure Testing](#configure-testing)
4. [Executing Test](#executing-the-tests)

# unitTestingFrameworks-Task4

In this folder, it is going to be allocated the project and test files for a web page.

![folderStructure][folderStructure]

To run the project it is used wdio,mocha,junit,allure-reporter,allure-cli

![packageList][packageList]

## Dependency installation
After cloning repository, go to the unitTestingFrameworks-Task1 and execute the command

```
npm install
```

This command should install all the dependencies for the project

![installingDependencies][installingDependencies]

## Configure Testing

For configuring the data test, you need to open the dataTest.js file on the datatest folder, in there is a definition of an instance

![testdata][testdata]

It is used a variable with keys, depending on the environtment to test, in each environtment can be allocated different test data, depending on the instance to add. the test data can be edited to created multiple purchases of instances, with different values, the fields are the following:

### name
This is the name of the instance to be created, this value is used to create a folder to save screenshots of the test, and it also outputs on the tests logs, it can be used to debug

### numberOfInstances
This is the number of instances to be created, it must be a number

### operatingSystemValue
This is the possible value of operating system avaliable for an instance, the values stored on the dataTest file are key values, and the avaliable values and wich represent are

```
free: 'Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)',
paidubuntu: 'Paid: Ubuntu Pro',
paidwindows2012: 'Paid: Windows Server 2012 R2, Windows Server 2016, Windows Server 2019, Windows Server (2004, 20H2)'
```

### provisionModelSelection
This is the posible provision model of the instance, the values stored on the dataTest file are key values, and the avaliable values and wich represent are

```
regular: 'regular',
spot: 'spot'
```

### machineFamilyValue
This is the machine family of the instance, the values stored on the dataTest file are key values, and the avaliable values and wich represent are

```
generalpurpose :'General Purpose',
computeoptimized:'Compute-optimized',
memoryoptimized:'Memory-optimized'
```

### seriesMachineValue
This is the series of the possible instance, the values stored on the dataTest file are key values, and the avaliable values and wich represent are

```
n1: 'N1',
n2: 'N2',
e2: 'E2'
```

### machineTypeValue
This is the type of machine that is going to be purchased, the values stored on the dataTest file are key values, and the avaliable values and wich represent are

```
n1standar1: 'n1-standard-1',
n1standar2: 'n1-standard-2',
n1standar4: 'n1-standard-4',
n2standar2: 'n2-standard-2'
```

### addGPU
This allow to add a GPU to an instance, or not.
This field allow 2 values (true in case, a value it is going to be added or false, in case not GPU is needed to be added)

```
'true' : adds the GPU option,
'false' : dont add GPU
```

**NOTE:** If a value of false is specified, the values of gpuModelValue and gpuNumberValue are not required

### gpuModelValue
This field allow to specify the GPU model to be added to the instance, the values stored on the dataTest file are key values, and the avaliable values and wich represent are

```
nvidiateslap100: 'NVIDIA Tesla P100',
nvidiateslap4: 'NVIDIA Tesla P4',
nvidiateslav100: 'NVIDIA Tesla V100',
nvidiateslat4: 'NVIDIA Tesla T4'
```
### gpuNumberValue
This field represent the number of GPU, the values stored on the dataTest file are key values, and the avaliable values and wich represent are

```
1: '1',
2: '2',
4: '4',
8: '8'
```

### localSSDValue
This field represent the Local SSD to be used, the values stored on the dataTest file are key values, and the avaliable values and wich represent are

```
'0':'0',
'1x375': '1x375 GB',
'2x375': '2x375 GB',
'3x375': '3x375 GB',
'24x375': '24x375 GB'
```

### regionValue
This is the region in which the instance will be, the values stored on the dataTest file are key values, and the avaliable values and wich represent are

```
uscentral1: 'us-central1',
uswest1: 'us-west1',
uswest2: 'us-west2'
```

### commitedSelection
This option is used to specify the commit ussage of the instance, the values stored on the dataTest file are key values, and the avaliable values and wich represent are

```
none: 'none',
year: 'year',
year3: 'year3'
```

**NOTE:** At the moment of creating an instance, it is mandatory that some options are not going to depend on the choices you make (e.g for example GPU instances may have region limitations, therefore if used a region with no GPU avaliable, the test would fail) 

## Executing the tests
These are the test avaliable to run:

```
npm run critical
npm run testing
npm run production
```

To configure the testSuite and environtment variables at runtime you can check:

[Test suite][testSuite]

[Environtment Variable][envVariable]

**npm run testing and production:** This tests are going to purchase instances, the difference between the commands is the dataset used. This command execute the test under the addCompute.js file in the specs folder
**npm run critical:** This test is used to open the google cloud main page, look for the pricing page, add an instance (default options are kept), and open the summary option

![runningTest][runningTest]

After the completition of the tests, there is going to be created new folders, allure-results, allure-report,a file named testResult, and a folder named screenshots, in this folder it is going to be the screenshots of the test.

![completeTest][completeTest]

To see the result of the test you can open the html file in the allure-report or see the screenshots, that are taken after each step of the test

To open the html file you need to create a [web server][liveserver]

![webserver][webserver]

![reportTest][reportTest]

In the screenshots folder there are images taken after completition of each step

Open the google cloud main page

![opengooglecloud][opengooglecloud]

input the pricing page into the search input

![searchpricingpage][searchpricingpage]

go to the search page to click the pricing page

![pricingpageclick][pricingpageclick]

Now go into the pricing page

![pricingpage][pricingpage]

To add an instance it does the following

Click the add estimate button to add a compute instance

![addestimate][addestimate]

Change the number of instances, select the operating system, and select the provision model

![numberinstance][numberinstance]

![operatingsystem][operatingsystem]

Select the machine family, the machine series and the machine type

![machinetype][machinetype]

Check the gpu option if needed and selecting the gpu model and the number of gpu

![numbergpu][numbergpu]

select the localSSD option

![localssd][localssd]

Finally select the region and the commit usage for the instance

![commitusage][commitusage]

After adding all the instances, it go to the shareestimate button and click it

![shareestimate][shareestimate]

And then click on the summary to compare the values

![summarypage][summarypage]

[liveserver]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
[testSuite]: https://webdriver.io/docs/organizingsuites/#grouping-test-specs-in-suites
[envVariable]: https://webdriver.io/es/docs/parameterize-tests/#passing-environment-variables

[folderStructure]: ../images/WebDriver-Task-4/FolderStructure.png
[packageList]: ../images/WebDriver-Task-4/PackageList.png
[installingDependencies]: ../images/WebDriver-Task-4/InstallingDependencies.png
[testdata]: ../images/WebDriver-Task-4/TestData.png
[runningTest]: ../images/WebDriver-Task-4/RunningTest.png
[completeTest]: ../images/WebDriver-Task-4/CompleteTest.png
[webserver]: ../images/WebDriver-Task-4/ReportFile.png
[reportTest]: ../images/WebDriver-Task-4/ReportResult.png

[opengooglecloud]: ../images/WebDriver-Task-4/openGoogleMainPage.png
[searchpricingpage]: ../images/WebDriver-Task-4/tryingToSearch.png
[pricingpageclick]: ../images/WebDriver-Task-4/searchPage.png
[pricingpage]: ../images/WebDriver-Task-4/pricingCalculatorPage.png

[addestimate]: ../images/WebDriver-Task-4/addEstimateClicked.png
[numberinstance]: ../images/WebDriver-Task-4/SelectNumberInstances.png
[operatingsystem]: ../images/WebDriver-Task-4/SelectOperatingSystem.png
[machinetype]: ../images/WebDriver-Task-4/typeMachineSelector.png
[numbergpu]: ../images/WebDriver-Task-4/SelectNumberGPU.png
[localssd]: ../images/WebDriver-Task-4/localSSDSelector.png
[commitusage]: ../images/WebDriver-Task-4/SelectCommitedOptions.png


[shareestimate]: ../images/WebDriver-Task-4/estimateShareScreen.png
[summarypage]: ../images/WebDriver-Task-4/summaryEstimation.png