import {test,expect, type Browser, type Page} from '@playwright/test';
import { chromium } from 'playwright';

test('screenshot test', async()=>{

    const browser : Browser = await chromium.launch({headless:false})

    const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1280, height: 720 }
    }
  });

    const page : Page = await context.newPage();


    await page.goto('https://www.amazon.com');

    await page.waitForLoadState();

    const timestamp = Date.now();

    await expect( page.locator('#twotabsearchtextbox').first()).toBeEditable();

    //await page.screenshot({path : 'screenshot/homepage'+timestamp+'.jpeg'});

    //await page.locator('#nav-logo-sprites').screenshot({path : 'screenshot/logo.png'});

    const navAElement = page.locator(`a:has-text("About Amazon")`);

    await navAElement.scrollIntoViewIfNeeded();

    await expect(navAElement).toHaveText('About flipkart');

    await context.close();

    await browser.close();

    await page.waitForTimeout(5000);

})
