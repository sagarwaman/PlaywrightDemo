import { test,expect, type Browser, type Page, type Locator } from "@playwright/test";
import { chromium } from 'playwright'

test('compairimg methods', async()=>{

    const broswer:Browser = await chromium.launch({headless : false});
    const page: Page = await broswer.newPage();

    await page.goto('https://demowebshop.tricentis.com/');

    const productTitleElement = page.locator('.product-title');
    //productitem.first().scrollIntoViewIfNeeded();

    //console.log(await productitem.nth(2).textContent());

    //console.log(await productitem.nth(2).innerText());

    const count = await productTitleElement.count();
    console.log(count);

    for(let i=0;i<count;i++){
       // const productname =await productTitleElement.nth(i).innerText();

       const productname : String | null = await productTitleElement.nth(i).textContent();
       // console.log(productname);
    }

    const productlist:String[] = await productTitleElement.allInnerTexts();

    //console.log(productlist);

    for(let name of productlist){
       // console.log(name)
    }

    const listproduct : Locator[] = await productTitleElement.all();
    //console.log(listproduct);

    for(let mylst of listproduct){
        console.log(await mylst.innerText())
    }

   await page.waitForTimeout(6000);
})