const { expect, browser, $ } = require('@wdio/globals');
const { existsSync, mkdirSync } = require('fs');
const pastebinPage = require('../../pageObject/pages/paste-bin.js');
const form = require('../../pageObject/components/formcomponent.js');
const dropMenu = require('../../pageObject/components/dropmenu.js');

const binPage = new pastebinPage();
const formPage = new form();
const dropMenuPage = new dropMenu();

describe('add paste bin stick', () => {

    beforeEach(async()=>{
        await binPage.open();
    })

    it('check The page title',async()=>{
        const pageTitle = 'Pastebin.com - #1 paste tool since 2002!';
        const title = await $('title');
        expect(title).toHaveText(pageTitle)
    })

    it('Check adding a new paste bin',async()=>{
        const textForm = await formPage.formElements('text');
        const expirationbutton = await formPage.formElements('expirationbutton');
        const pasteTitleText = await formPage.formElements('pastetitle');
        const addButton = await formPage.formElements('addbutton');

        await textForm.setValue('Hello from WebDriver');
        await saveScreenShot('./screenshots/','savetext.png');
        
        await binPage.scrollDown(0,600);

        await expirationbutton.click();

        const expirationDrop = await dropMenuPage.dropMenuElement('10m');

        await expirationDrop.click();

        await saveScreenShot('./screenshots/','Expiration.png');

        await pasteTitleText.setValue('helloweb');
        await saveScreenShot('./screenshots/','savetitle.png');

        console.log(await textForm.getValue());
        console.log(await pasteTitleText.getValue());

        await binPage.scrollDown(0,600);
        await addButton.click();

        await saveScreenShot('./screenshots/','newPage.png');

        const pageTitle = 'Hello from WebDriver';
        const title = await $('title');

        console.log(title);

        expect(title).toHaveText(pageTitle)
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