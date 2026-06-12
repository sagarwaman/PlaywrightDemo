import {test,expect, type Browser, type Page} from '@playwright/test';
import { chromium } from 'playwright';

test.beforeEach("launching website", async({page})=>{

   page.goto('https://demowebshop.tricentis.com/login');

})

test("validate register link", async({page})=> {

const icoRegisterElement = page.locator('.ico-register');

await expect(icoRegisterElement).toBeVisible();

await expect(icoRegisterElement).toHaveText('Register');

await page.waitForTimeout(4000);

})

test("search item test", async({page})=>{

    const qField = page.locator('[name="q"]');
    await qField.fill("Laptop");

    const button1Element = page.locator('.button-1.search-box-button');
    await button1Element.click();

    const element = page.locator(`a:has-text("14.1-inch Laptop")`);
    await element.scrollIntoViewIfNeeded();

    await expect(element).toBeVisible();

    await page.waitForTimeout(4000);

})
