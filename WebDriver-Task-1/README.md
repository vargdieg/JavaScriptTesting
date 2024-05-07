# Index WebDriver-Task-1

1. [Introduction](#unittestingframeworks-task1)
2. [Dependency installation](#dependency-installation)
3. [Executing Test](#executing-the-tests)

# unitTestingFrameworks-Task1

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

## Executing the tests
For executing the test you can use the command

```
npm run wdio
```

This command is going to execute all the test specified on the test.e2e.js file in the test folder

![runningTest][runningTest]

After the completition of the tests, there is going to be created new folders, allure-results, allure-report, screenshots and a file named testResult

![completeTest][completeTest]

To see the result of the test you can open the html file in the allure-report or see the screenshots, that are taken after each step of the test

To open the html file you need to create a [web server][liveserver]

![webserver][webserver]

![reportTest][reportTest]

In the screenshots folder there are images taken after completition of each step

Save body text

![savetext][savetext]

Save title text

![savetitle][savetitle]

Save expiration

![expiration][expiration]

And after saving the element

![newpage][newpage]

[liveserver]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer


[folderStructure]: ../images/WebDriver-Task-1/FolderStructure.png
[packageList]: ../images/WebDriver-Task-1/PackageList.png
[installingDependencies]: ../images/WebDriver-Task-1/InstallDependencies.png
[runningTest]: ../images/WebDriver-Task-1/RunningTests.png
[completeTest]: ../images/WebDriver-Task-1/CompleteTest.png
[webserver]: ../images/WebDriver-Task-1/ReportFile.png
[reportTest]: ../images/WebDriver-Task-1/ReportResult.png
[savetext]: ../images/WebDriver-Task-1/savetext.png
[savetitle]: ../images/WebDriver-Task-1/savetitle.png
[expiration]: ../images/WebDriver-Task-1/Expiration.png
[newpage]: ../images/WebDriver-Task-1/newPage.png