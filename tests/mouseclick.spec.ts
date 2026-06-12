import {test,expect, type Browser, type Page} from '@playwright/test'
import { chromium } from 'playwright'

test('mouse click events', async() => {
   const browser:Browser = await chromium.launch({headless : false});
   const page:Page = await browser.newPage();

   page.goto('https://vinothqaacademy.com/mouse-event/');

   await page.locator('#doubleBtn').dblclick();
   const text = await page.locator('#doubleStatus').textContent();

   console.log(text);

   page.locator('#rightBtn').click({button : 'right'});

   await page.locator('//button[text()="Edit"]').click();
   console.log(await page.locator('#rightStatus').textContent());

   await page.locator('#dragItem').dragTo(page.locator('#dropZone'));

   console.log(await page.locator('#dragStatus').textContent())


   page.goto('https://www.amazon.in/');

   await page.locator('#twotabsearchtextbox').pressSequentially("macbook", {delay : 500});
   
   
   await page.waitForTimeout(5000);




})