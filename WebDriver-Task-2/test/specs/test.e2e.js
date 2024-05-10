const { expect, browser, $ } = require('@wdio/globals');
const { existsSync, mkdirSync } = require('fs');
const pastebinPage = require('../../pageObject/pages/paste-bin.js');
const form = require('../../pageObject/components/formcomponent.js');
const dropMenu = require('../../pageObject/components/dropmenu.js');
const titlePage = require('../../pageObject/components/title.js');
const topButton = require('../../pageObject/components/topbuttons.js');
const sourceElement = require('../../pageObject/components/source.js');

const screenShotsFilePath = './screenshots/';

let binPage = '';
let formPage = '';
let dropMenuPage = '';
let titleMenu = '';
let topButtonMenu = '';
let sourceMenu = '';

const initialPageTitle = 'Pastebin.com - #1 paste tool since 2002!';
const desiredStickyText = 'git config --global user.name  "New Sheriff in Town" \ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code") \ngit push origin master --force';

const inputText = ['git config','--global','user.name','"New Sheriff in Town"',
        'git reset','git commit-tree','HEAD^','"Legacy code"',
        'git push','origin master','--force']

const desiredExpirationValue = '10 Minutes';
const formexpirationValue = '10m';

const desiredLanguage = 'Bash';
const formlanguageValue = 'bash';

const desiredStickyTitleValue = 'how to gain dominance among developers';

describe('add paste bin stick with 10 min expiration,a language highlight ,a custom title and custom text', () => {
    
    before(async()=>{
        binPage = new pastebinPage();
        formPage = new form();
        dropMenuPage = new dropMenu();
        titleMenu = new titlePage();
        topButtonMenu = new topButton();
        sourceMenu = new sourceElement();
        await binPage.open();
    })

    it('check The sticky page title',async()=>{
        const title = await titleMenu.rootEl;

        expect(title).toHaveText(initialPageTitle);
    })

    it('check that the text form is changed to the desired value',async()=>{
        const textForm = await formPage.formElements('text');
        await textForm.clearValue();
        await textForm.setValue(desiredStickyText);
        await saveScreenShot(screenShotsFilePath,'saveText.png');

        expect(textForm).toHaveText(desiredStickyText)
    })

    it('check that the expiration is changed to the desired value',async()=>{
        const expirationbutton = await formPage.formElements('expirationbutton');
        await binPage.scrollDown(0,600);
        await expirationbutton.click();

        await (await dropMenuPage.rootEl).isExisting();
        const expirationDrop = await dropMenuPage.dropMenuElement(formexpirationValue);

        await expirationDrop.click();

        await saveScreenShot(screenShotsFilePath,'saveExpiration.png');

        expect(expirationbutton).toHaveText(desiredExpirationValue);
    })

    it(`Check that the language is changed to the desired value`,async()=>{
        const languagebutton = await formPage.formElements('highlight');
        
        await languagebutton.click();
        await (await dropMenuPage.langEl).isExisting();

        await dropMenuPage.filterMenuLanguages(formlanguageValue);
        const languageDrop = await dropMenuPage.dropMenuLanguages(formlanguageValue);
        await languageDrop.click();

        await saveScreenShot(screenShotsFilePath,'saveLanguage.png');

        expect(languagebutton).toHaveText(desiredLanguage)
    })

    it(`Check that the sticky title value is changed to the desired value`,async()=>{
        
        const pasteTitleText = await formPage.formElements('pastetitle');
        await pasteTitleText.setValue(desiredStickyTitleValue);

        await saveScreenShot(screenShotsFilePath,'savetitle.png');

        expect(pasteTitleText).toHaveText(desiredStickyTitleValue);
    })

    it('Check adding a new paste bin',async()=>{
        const addButton = await formPage.formElements('addbutton');

        await binPage.scrollDown(0,600);
        await addButton.click();

        const title = await titleMenu.rootEl;

        await saveScreenShot(screenShotsFilePath,'newPage.png');

        expect(title).toHaveText(desiredStickyTitleValue)
    })

    it(`Check the language of the sticky note`,async()=>{
        const languageText = await topButtonMenu.buttonElement(desiredLanguage);
        expect(languageText).toHaveText(desiredLanguage)
    })

    it('check the result text', async () => {
        const sourceItem = await sourceMenu.rootEl;
        //Validation done this way cause the HTML to simplify the validation processs
        expect(sourceItem).toHaveText(inputText)
        
    })

    after(async()=>{
        binPage = null;
        formPage = null;
        dropMenuPage = null;
        titleMenu = null;
        topButtonMenu = null;
        sourceMenu = null;
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