import {test,expect,chromium, type Browser, type Page} from '@playwright/test'

test('handle tabs',async()=>{

  const browser : Browser = await chromium.launch({headless : false});
  const context = await browser.newContext();
  const parentpage : Page =  await context.newPage();

  await parentpage.goto('https://testautomationpractice.blogspot.com/');

  const element = parentpage.locator(`button:has-text("New Tab")`);

  await element.scrollIntoViewIfNeeded();

  console.log('Parent page title is ',await parentpage.title());

  const [childpage] = await Promise.all([context.waitForEvent('page'),await element.click()]);

  console.log( context.pages().length);

  console.log('Child page title is ',await childpage.title());

  await parentpage.waitForTimeout(4000);
});

test('Handle window', async()=>{

  const browser : Browser = await chromium.launch({headless : false});
  const context = await browser.newContext();
  const parentpage : Page =  await context.newPage();

  await parentpage.goto('https://testautomationpractice.blogspot.com/');

  const popup = parentpage.locator('#PopUp');

  await Promise.all([parentpage.waitForEvent('popup'),await parentpage.locator('#PopUp').click()]);

  console.log(context.pages().length);

  console.log( context.pages()[0]?.url());
  console.log( context.pages()[1]?.url());
  console.log( context.pages()[2]?.url());

  for(const pw of context.pages()){

    const title =await pw.title();
    console.log(title);

    if(title.includes('Selenium')){
        await pw.bringToFront();
       const seleniumAutomatesBrowsersThatHeading = parentpage.getByRole('heading', { name: 'Selenium automates browsers. That\'s it!', level: 1 }); 
       console.log(await seleniumAutomatesBrowsersThatHeading.textContent());
    }
    
  }

  await parentpage.waitForTimeout(4000);


 
})