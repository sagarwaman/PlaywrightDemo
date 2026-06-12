import {test,expect,type Browser, type Page,type BrowserContext, type Locator} from '@playwright/test'
import { chromium } from 'playwright'

test ('Registration test', async()=>{

    const browser:Browser = await chromium.launch({headless : false});
    const browserContext_1:BrowserContext = await browser.newContext();
    const page_1:Page = await browserContext_1.newPage();


    await page_1.goto("https://demo.automationtesting.in/Register.html");

    const firstNameField1:Locator =await page_1.getByPlaceholder('First Name');
    const lastNameElement1:Locator =await page_1.locator(`//input[@placeholder='Last Name']`);
    
    const browserContext_2:BrowserContext = await browser.newContext();
    const page_2:Page = await browserContext_2.newPage();
     
    await firstNameField1.fill("Sagar");
    await lastNameElement1.fill("Waman");

    await page_2.goto("https://demo.automationtesting.in/Register.html");

    const firstNameField2:Locator =await page_2.getByPlaceholder('First Name');
    const lastNameElement2:Locator =await page_2.locator(`//input[@placeholder='Last Name']`);
    
    await firstNameField2.fill("Pooja");
    await lastNameElement2.fill("Bhore");

});