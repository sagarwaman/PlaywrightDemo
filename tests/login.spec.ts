
import {test,expect,type Browser,type Page,type Locator} from '@playwright/test'
import {webkit,chromium,firefox} from 'playwright'

test('login test', async()=>{

    const browser:Browser =  await chromium.launch({headless : false, channel : 'chrome'})
    const page:Page = await browser.newPage();
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    const username:Locator = await page.locator('#username');

    const password:Locator = await page.locator('#password');

    const submit:Locator = await page.locator('#submit');
 
    const postTitleElement:Locator = page.locator('.post-title');

    await username.fill("student");
    await password.fill("Password123");
    await submit.click();
    const pageHeader = await postTitleElement.
    textContent();
    const title = await page.title();
    console.log("Page title is "+title)

    expect(pageHeader).
    toEqual('Logged In Successfully');
    await page.screenshot({path : 'homepage.png'});
    
    browser.close();
    

});