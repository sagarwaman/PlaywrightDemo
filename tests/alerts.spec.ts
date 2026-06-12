import {test,expect, type Browser, type Page} from '@playwright/test'
import { chromium } from 'playwright'

test('Handle alerts', async()=>{

    const browser:Browser = await chromium.launch({headless : false})
    const page:Page = await browser.newPage();

    page.goto('https://www.selenium.dev/selenium/web/alerts.html');

    page.on('dialog', (dialog) => { 
        
        console.log(dialog.message());
        console.log(dialog.type());
        
        dialog.accept();
    });

    const alert = page.locator('#alert');

    await alert.first().click();

    await page.waitForTimeout(5000);


})

test('Dialogue alert',async()=>{

    const browser:Browser = await chromium.launch({headless : false})
    const page:Page = await browser.newPage();

    page.goto('https://www.selenium.dev/selenium/web/alerts.html');

    page.on('dialog', (dialog) => { 
        
        console.log(dialog.message());
        console.log(dialog.type());
        
        dialog.accept();
    });

    page.locator('#confirm').click();

    await page.waitForTimeout(5000);
})

test('Prompt alert',async()=>{

    const browser:Browser = await chromium.launch({headless : false})
    const page:Page = await browser.newPage();

    page.goto('https://www.selenium.dev/selenium/web/alerts.html');

    page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`); // Optional: read message
    console.log(dialog.type()); 

    // 2. Pass text into the prompt using accept()
    if (dialog.type() === 'prompt') {

      console.log(dialog.defaultValue()); 
      await dialog.accept('Hello from Playwright!');
    } else {
      await dialog.accept(); // For standard alerts/confirms
    }

    const text = page.locator('#text');

    await text.scrollIntoViewIfNeeded();
    console.log(await text.textContent());
  });

  const promptWithDefaultHappenLink = page.getByRole('link', { name: 'prompt with default happen' });
  await promptWithDefaultHappenLink.click();

  page.on('dialog',(dialog1) =>{

   console.log( dialog1.message());
   dialog1.dismiss();

  })

  const alertinframeElement = page.frameLocator('iframe[name="iframeWithIframe"]').frameLocator('iframe[name="iframeWithAlert"]').locator(`a:has-text("click me")`);
  await alertinframeElement.click();

  await page.waitForTimeout(5000);
});