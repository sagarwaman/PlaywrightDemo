import { test, expect, type Browser, type Page, type Locator } from '@playwright/test'
import { webkit, chromium, firefox } from 'playwright'
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const csvpath = 'testdata/data.csv'

const filecontent : any = fs.readFileSync(csvpath, 'utf-8');

parse(filecontent, { columns: true, skip_empty_lines: true });

test.describe('Login page parameter test', () => {

    for (const data of filecontent) {

        test(`login scenario test for ${data.email}  and ${data.password}`, async () => {

            const browser = await chromium.launch({ headless: false });

            const page = await browser.newPage();

            await page.goto('https://demowebshop.tricentis.com/login');

            await page.locator('#Email').fill(data.email);

            await page.locator('#Password').fill(data.password);

            page.locator('.button-1.login-button').click();

            if (data.validity.toLowerCase() == 'valid') {
                await page.locator('.ico-logout').isVisible();
                expect(page.locator('.ico-logout')).toBeVisible({ timeout: 4000 });
            } else {
                expect(page.locator('.validation-summary-errors')).toBeVisible({ timeout: 2000 });

                expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }

            await page.waitForTimeout(4000);

            browser.close();
            page.close();

        })
    }
});