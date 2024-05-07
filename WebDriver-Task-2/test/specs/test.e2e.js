const { expect, browser, $ } = require('@wdio/globals');
const { existsSync, mkdirSync } = require('fs');
const pastebinPage = require('../../pageObject/pages/paste-bin.js');
const form = require('../../pageObject/components/formcomponent.js');
const dropMenu = require('../../pageObject/components/dropmenu.js');
const titlePage = require('../../pageObject/components/title.js');
const topButton = require('../../pageObject/components/topbuttons.js');
const sourceElement = require('../../pageObject/components/source.js');

const binPage = new pastebinPage();
const formPage = new form();
const dropMenuPage = new dropMenu();
const titleMenu = new titlePage();
const topButtonMenu = new topButton();
const sourceMenu = new sourceElement();

describe('add paste bash stick', () => {
    
    beforeEach(async()=>{
        await binPage.open();
    })

    it('check adding the bash parameters', async () => {
        const textForm = await formPage.formElements('text');
        const expirationbutton = await formPage.formElements('expirationbutton');
        const languagebutton = await formPage.formElements('highlight');
        const pasteTitleText = await formPage.formElements('pastetitle');
        const addButton = await formPage.formElements('addbutton');

        await textForm.clearValue();
        await textForm.addValue('git config --global user.name  "New Sheriff in Town" \n');
        await textForm.addValue('git reset $(git commit-tree HEAD^{tree} -m "Legacy code") \n');
        await textForm.addValue('git push origin master --force');

        await saveScreenShot('./screenshots/','saveText.png');

        await binPage.scrollDown(0,600);
        await expirationbutton.click();
        await (await dropMenuPage.rootEl).isExisting();
        const expirationDrop = await dropMenuPage.dropMenuElement('10m');
        await expirationDrop.click();

        await saveScreenShot('./screenshots/','saveExpiration.png');

        await pasteTitleText.setValue('how to gain dominance among developers');
        await saveScreenShot('./screenshots/','savetitle.png');
      
        
        await languagebutton.click();
        await (await dropMenuPage.langEl).isExisting();

        await dropMenuPage.filterMenuLanguages('bash');
        const languageDrop = await dropMenuPage.dropMenuLanguages('bash');
        await languageDrop.click();

        await saveScreenShot('./screenshots/','saveLanguage.png');

        await binPage.scrollDown(0,600);
        await addButton.click();

        const pageTitle = 'how to gain dominance among developers';
        const langType = 'Bash';
        const inputText = ['git config','--global','user.name','"New Sheriff in Town"',
        'git reset','git commit-tree','HEAD^','"Legacy code"',
        'git push','origin master','--force']

        const title = await titleMenu.rootEl;
        const languageText = await topButtonMenu.buttonElement(langType);
        const sourceItem = await sourceMenu.rootEl;

        await saveScreenShot('./screenshots/','newPage.png');

        expect(title).toHaveText(pageTitle) && expect(languageText).toHaveText(langType)
        && expect(sourceItem).toHaveText(inputText[0]) && expect(sourceItem).toHaveText(inputText[1])
        && expect(sourceItem).toHaveText(inputText[2]) && expect(sourceItem).toHaveText(inputText[3])
        && expect(sourceItem).toHaveText(inputText[4]) && expect(sourceItem).toHaveText(inputText[5])
        && expect(sourceItem).toHaveText(inputText[6]) && expect(sourceItem).toHaveText(inputText[7])
        && expect(sourceItem).toHaveText(inputText[8]) && expect(sourceItem).toHaveText(inputText[9])
        && expect(sourceItem).toHaveText(inputText[10])
        
        //expect(pasteTitleText).toHaveText('how to gain dominance among developers');
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