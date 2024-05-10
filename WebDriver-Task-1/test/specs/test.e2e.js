const { expect, browser, $ } = require('@wdio/globals');
const { existsSync, mkdirSync } = require('fs');
const pastebinPage = require('../../pageObject/pages/paste-bin.js');
const form = require('../../pageObject/components/formcomponent.js');
const dropMenu = require('../../pageObject/components/dropmenu.js');
const titlePage = require('../../pageObject/components/title.js');

const screenShotsFilePath = './screenshots/';

let binPage = '';
let formPage = '';
let dropMenuPage = '';
let titleMenu = '';

const initialPageTitle = 'Pastebin.com - #1 paste tool since 2002!';
const desiredStickyText = 'Hello from WebDriver';
const desiredExpirationValue = '10 Minutes';
const formexpirationValue = '10m';
const desiredStickyTitleValue = 'helloweb';

describe('add paste bin stick with 10 min expiration a custom title and custom text',async () => {

    before(async()=>{
        binPage = new pastebinPage();
        formPage = new form();
        dropMenuPage = new dropMenu();
        titleMenu = new titlePage();
        await binPage.open();
    })

    it('check The sticky page title',async()=>{
        const title = await titleMenu.rootEl;

        expect(title).toHaveText(initialPageTitle);
    })
    
    it('check that the text form is changed to the desired selection',async()=>{
        const textForm = await formPage.formElements('text');
        await textForm.setValue(desiredStickyText);
        await saveScreenShot(screenShotsFilePath,'savetext.png');

        expect(textForm).toHaveText(desiredStickyText)
    })
    
    it('check that the expiration is changed to the desired value',async()=>{
        const expirationbutton = await formPage.formElements('expirationbutton');
        await binPage.scrollDown(0,600);
        await expirationbutton.click();

        await (await dropMenuPage.rootEl).isExisting();
        const expirationDrop = await dropMenuPage.dropMenuElement(formexpirationValue);

        await expirationDrop.click();

        await saveScreenShot(screenShotsFilePath,'Expiration.png');

        expect(expirationbutton).toHaveText(desiredExpirationValue);
    })
    
    it(`Check that the sticky title value is the desired`,async()=>{
        
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
    
    after(async()=>{
        binPage = null;
        formPage = null;
        dropMenuPage = null;
        titleMenu = null;
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