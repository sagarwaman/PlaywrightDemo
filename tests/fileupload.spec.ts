import {test, expect, type Browser, type Page} from '@playwright/test'
import path from 'path';
import { chromium } from 'playwright'

test('File upload test', async() => {
    const browser:Browser = await chromium.launch({headless : false});
    const page:Page = await browser.newPage();

    page.goto('https://practice.expandtesting.com/upload');

    await page.locator('#fileInput').setInputFiles("/home/sagar-waman/Pictures/abc.png");

    page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    await page.locator('#filesToUpload').setInputFiles(["/home/sagar-waman/Pictures/abc.png",
                        "/home/sagar-waman/Downloads/virat.jpeg"]);

    await page.waitForTimeout(5000);

});