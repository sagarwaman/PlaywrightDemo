import {test,expect, type Browser, type BrowserContext,type Page} from '@playwright/test'
import { chromium } from 'playwright'

test('auth test', async()=>{

    const browser:Browser = await chromium.launch({headless : false});
    const context:BrowserContext = await browser.newContext();
    const page:Page = await context.newPage();

    const username = 'admin';
    const password = 'admin';
    const authHeader ='Basic ' + btoa(username+':'+password);
    page.setExtraHTTPHeaders({Authorization:authHeader});

    page.goto('https://the-internet.herokuapp.com/basic_auth');

    await new Promise(() => {});
});