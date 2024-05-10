# Index unitTestingFrameworks-Task1

1. [Introduction](#unittestingframeworks-task1)
2. [Dependency installation](#dependency-installation)
3. [Executing Test](#executing-the-tests)
4. [Executing Coverage](#executing-coverage)

# unitTestingFrameworks-Task1

In this folder, it is going to be allocated the project and test files (isNumberEven.spec.js) for the numbers_validator.js app.

![folderStructure][folderStructure]

To run the project it is used c8,chai,mocha,mochawesome,

![packageList][packageList]

## Dependency installation
After cloning repository, go to the unitTestingFrameworks-Task1 and execute the command

```
npm install
```

This command should install all the dependencies for the project

![installingDependencies][installingDependencies]

## Executing the tests
For executing the test you can use the command

```
npm run test
```

This command is going to execute all the test specified on the isNumberEven.spec.js file in the test folder

![runningTest][runningTest]

After the completition of the tests, a new folder is going to be created mochawesome-report in which there is going to be an html file containing the resume of the tests

![completeTest][completeTest]

To see the result of the test you can open the html file in the mochawesome-report folder

![reportTest][reportTest]

## Executing coverage
For executing and watching the coverage of the code you can use the command

```
npm run coverage
```

this command is going to execute the test, and also is going to verify, which lines of the app code are not being tested, and the porcentage it represent

![runningCoverage][runningCoverage]

After the completition of the tests, a new folder is going to be created, coverage, in which there is going to be an index.html file, containing the detail of the coverage of the test

![completeCoverage][completeCoverage]

To see the coverage of the test, open the index.html file

![reportCoverage][reportCoverage]

[folderStructure]: ../images/unitTestingFrameworks-Task1/ProjectStructure.png
[packageList]: ../images/unitTestingFrameworks-Task1/PackageList.png
[installingDependencies]: ../images/unitTestingFrameworks-Task1/InstallingDependencies.png

[runningTest]: ../images/unitTestingFrameworks-Task1/RunningTest.png
[completeTest]: ../images/unitTestingFrameworks-Task1/RunningTestResult.png
[reportTest]: ../images/unitTestingFrameworks-Task1/testIndexFile.png

[runningCoverage]: ../images/unitTestingFrameworks-Task1/RunningCoverage.png
[completeCoverage]: ../images/unitTestingFrameworks-Task1/completeCoverage.png
[reportCoverage]: ../images/unitTestingFrameworks-Task1/ReportCoverage.png