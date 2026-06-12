import {test,expect, type Browser, type Page, type Locator} from '@playwright/test'
import { chromium } from 'playwright'

test('Verify action methods', async()=>{

        const browser:Browser = await chromium.launch({headless : false});
        const page:Page = await browser.newPage();
    
        await page.goto('https://vinothqaacademy.com/demo-site/');

        const vinothTechSolutionsImage = page.getByAltText('Vinoth Tech Solutions');

        await expect(vinothTechSolutionsImage).toBeVisible();

        const registrationFormHeading = page.getByRole('heading', { name: 'Registration Form', level: 3 });

        await expect(registrationFormHeading).toBeVisible();

        const firstname:Locator = page.getByRole('textbox', { name: 'First Name  *' });
        
        await firstname.fill('Sagar');

        console.log('Input value is ',await firstname.inputValue())

        await page.getByRole('textbox', { name: 'Last Name  *' }).fill('Waman');

        await page.getByLabel('Male').first().click();

        await page.getByRole('textbox', { name: 'Street Address' }).fill('Satyam apartments');

        await page.getByLabel('City').fill('Navi mumbai');

        await page.getByRole('textbox', { name: 'Email  *' }).fill('sagarw094@gmail.com');

        await page.getByLabel('Mobile Number').fill('+918652625616');

        const checkBoxCount:number = await page.locator('.vfb-checkbox  ').count();

        console.log("Checkbox count is ",checkBoxCount)

        for(let i=0;i<checkBoxCount;i++){
            const checkbox = page.locator('.vfb-checkbox  ').nth(i);
            await checkbox.check();
        }

        const enterYourQueryField = page.getByRole('textbox', { name: 'Enter your query' });

        await expect(enterYourQueryField).toBeVisible();

        await expect(enterYourQueryField).toBeEditable();
});