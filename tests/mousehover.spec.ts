import {test, expect, type Browser, type Page } from "@playwright/test"
import { chromium } from "playwright"

test('mouse hover test', async() => {
    const browser:Browser = await chromium.launch({headless : false});
    const page:Page = await browser.newPage();

    page.goto('https://www.cricbuzz.com/');

    await page.locator('//a[@title="Cricket Series"]').first().hover();

    await page.locator('//a[@title="Indian Premier League 2026"]').click();

    await page.waitForTimeout(5000);
})

