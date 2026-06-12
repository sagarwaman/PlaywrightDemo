import {test,expect,type Browser,type Page,type Locator} from '@playwright/test'
import {webkit,chromium,firefox} from 'playwright'

const logindata:[string,string,string][] =[
     ["laura.taylor1234@example.com","test123","valid"],
     ["invalid123@example.com","test123","invalid"],
     ["test@yopmail.com","test123","invalid"],
     ["","","invalid"]
]; 

for(const [email,password,validity] of logindata){

    test.describe('Login test parameter test', async()=>{ 

    test(`loginpage test for ${email} and ${password}`, async()=>{

    const browser = await chromium.launch({headless : false});

    const page = await browser.newPage();

    await page.goto('https://demowebshop.tricentis.com/login');

    await page.locator('#Email').fill(email);

    await page.locator('#Password').fill(password);

    page.locator('.button-1.login-button').click();

    if(validity.toLowerCase() == 'valid'){
      await page.locator('.ico-logout').isVisible();
      expect(page.locator('.ico-logout')).toBeVisible({timeout : 4000});
    }else{
      expect(page.locator('.validation-summary-errors')).toBeVisible({timeout : 2000});

      expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
    }

   
    await page.waitForTimeout(4000);

    browser.close();
    page.close();

})
});
}