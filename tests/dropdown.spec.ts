import {test,expect, type Browser, type Page, type Locator} from '@playwright/test'
import { text } from 'node:stream/consumers';
import { chromium } from 'playwright'

test('Dropdown test', async() => {
    const browser:Browser = await chromium.launch({headless : false});
    const page:Page = await browser.newPage();

    await page.goto('https://proleed.academy/exercises/selenium/automation-practice-form-with-radio-button-check-boxes-and-drop-down.php');

    const dobMonth =  page.locator('#dob_month');
    const dobDate =  await page.locator('#dob_date');
    const dobYear = page.locator('#dob_year');

    await dobMonth.scrollIntoViewIfNeeded();

    await page.selectOption('#dob_month', {label : 'March'});
    await page.selectOption('#dob_year',{index : 10})

    const allOptions = await page.$$('#dob_month' + ' > option');
    console.log(allOptions.length);

    for(const e of allOptions){
        const text = await e.textContent();
        console.log(text);
    }

    const dobDates:String[] = await page.locator('#dob_date').allTextContents();

    console.log('---------------------------------------------------------------');

    for(const text of dobDates){
        console.log(text)
    }

    const countryCode = page.locator('#country_code');

    await countryCode.scrollIntoViewIfNeeded();

    await countryCode.selectOption('India (+91)');

    await page.locator('#nationality').selectOption({value : 'indian'});

    const country : Locator =  page.locator('#country');
 
    await country.scrollIntoViewIfNeeded();

    await country.selectOption({label : 'India'})

    const nationality : String[] = (await page.locator('#nationality').allTextContents()).map(text => text.trim());
    
    console.log(nationality)
 
    await page.waitForTimeout(2000);
});