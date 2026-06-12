import {test,expect,type Browser,type Page,type Locator} from '@playwright/test'
import { table } from 'node:console';
import {chromium} from 'playwright'

test('validate table data', async()=>{

    const browser:Browser = await chromium.launch({headless : false});
    const page:Page = await browser.newPage();

    page.goto('https://selectorshub.com/xpath-practice-page/');

    const resultTable = page.locator('#resultTable');

    await resultTable.scrollIntoViewIfNeeded();

    expect(await resultTable.isVisible());

    const theader: Locator = page.locator('#resultTable tr td a');

    console.log(await theader.count());



    for(let i:number=0;i<  await theader.count();i++){
  
        //console.log(await theader.nth(i).textContent());

        if(await theader.nth(i).textContent() == 'Joe.Root'){
            console.log("Username is present");
        }
    }

    const tablerow = page.locator('#resultTable tbody tr');
 
    console.log(await tablerow.count());

    const tbdata = tablerow.locator('td.left');

    console.log(await tbdata.count());

    const tabledata  = await tbdata.all();

    for(let i of tabledata){
        const data = await i.allInnerTexts();
        //console.log(data.join('/t'));

    }
 
    for(let i of await tablerow.all()){

    const cells = await i.locator('td.left').allInnerTexts();

    const username = cells[0];
    const role = cells[1];

    if(username === 'John.Smith'){
        console.log(role);
    }
    }

   const rolename = page.locator('td:right-of(:text("John.Smith"))'); 

   console.log(await rolename.first().textContent());

    await page.waitForTimeout(4000);

})
 