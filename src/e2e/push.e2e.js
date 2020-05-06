// const puppeteer =require('puppeteer');
// async function aliyun (){
//     const browser=await puppeteer.launch({headless:false});
//     const page=await browser.newPage(); 
//     await page.goto('https://account.aliyun.com/register/register.htm?')
// };
// aliyun();
// const puppeteer =require('puppeteer');
import puppeteer from 'puppeteer';
let browser;
let page;
test('aliyun',async()=>{
    browser=await puppeteer.launch({headless:false,slowMo:20});
    page=await browser.newPage(); 
   await page.goto('https://account.aliyun.com/register/register.htm?'); 
    await page.waitFor(2000);
});

test('t',async()=>{
    await page.waitForSelector('#alibaba-register-box');
    const frame= await page.frames().find(frame=>frame.url().includes('https://passport.aliyun.com'));
    const span =await frame.waitForSelector('#nc_1_n1z');
    const spanI = await span.boundingBox();
    console.log('spanI:',spanI);
    const div =await frame.waitForSelector('#nc_1__scale_text');
    const divI =div.boundingBox();
    console.log('divI:',divI);
    
    await page.mouse.move(spanI.x,spanI.y);
    await page.mouse.down();
    for(var i=0;i<(await divI).width;i++){
        await page.mouse.move(spanI.x+i,spanI.y)
    }
    await page.mouse.up();
})