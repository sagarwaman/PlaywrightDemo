import {test,expect, type Browser, type Page, type Locator} from '@playwright/test'
import { chromium } from 'playwright'

test('Dropdown test', async() => {
    const browser:Browser = await chromium.launch({headless : false});
    const page:Page = await browser.newPage();

    page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator('#datepicker').click();

    const year='2027'; 
    const date = '12';
    const month = 'December';

    while(true){

        const datepickermonth=await page.locator('.ui-datepicker-month').textContent();
        const datepickeryear=await page.locator('.ui-datepicker-year').textContent();

        if(datepickermonth === month && datepickeryear === year){
             break;
        }

        const uiIconElement:Locator = page.locator('.ui-datepicker-next');
        await uiIconElement.click();

    }

   const dt =await page.locator('.ui-datepicker-calendar td').all();

   for(let date1 of dt){
    const datetext = (await date1.innerText()).trim();
    
    if(datetext === String(date)){
        await date1.click();
        break;
    }
   }

    await page.locator('.hasDatepicker').last().fill('15/04/2026');

   await page.waitForTimeout(4000);
});
