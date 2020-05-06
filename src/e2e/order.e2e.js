describe('订单测试', () => {
it('open basicForm page', async () => {
  await page.goto(`${BASE_URL}/#/order/all`);
});

it('test text is 订单 ',async ()=>{
    await page.waitForSelector('.ant-page-header-heading-title');
    let text = await page.$eval('.ant-page-header-heading-title',ele=>ele.innerText); 
    console.log('text=',text);  
});

it('订单查询',async ()=>{
    await page.waitForSelector('.ant-table-row');
    const order =  await page.waitForSelector('#name');
    await order.type('1112');
    await page.click('button[type="submit"]');
    await page.waitFor(3000);
    await page.click('button[type="button"]'); //重置按钮
},40000);

it('删除测试',async ()=>{
    await page.waitFor(3000);
    await page.waitForSelector('.ant-table-row');
    //2.删除
    await page.waitFor('.ant-table-tbody > tr:nth-child(1) .ant-checkbox');
    await page.click('.ant-table-tbody > tr:nth-child(1) .ant-checkbox');
    const option =await page.waitForSelector('.ant-btn.ant-dropdown-trigger');
    await option.click();
    await page.waitFor(1000)
    await page.click('.ant-dropdown-menu-item:first-child')
},40000);
it('添加测试',async ()=>{
    await page.waitFor(5000);
    await page.waitForSelector('.ant-table-row');
    await page.waitFor('a[href="#/order/draft/create"]');
    await page.click('a[href="#/order/draft/create"]');
    const choose =await page.waitForSelector('.ant-select-selection__placeholder');
    await page.waitFor(1000);
    await choose.click();
    await page.waitFor(1000);
    const goodsList = await page.$$('ul[role="listbox"] li');
    const goods =await page.$$eval('ul[role="listbox"] li',eles=>(eles.map(ele=>ele.textContent)));
    console.log(goods);
    
    const goodsIndex =await goods.findIndex(i=>{
         if(i){
            return i.includes('black');
         }
    });
    console.log('index:',goodsIndex);
    
    await goodsList[goodsIndex].click();
    const note =await page.waitForSelector('input[placeholder="add a note..."]');
    await note.type('wwww');
    const customer =await page.waitForSelector('div[title="搜索顾客"]')
    await customer.click();
    await page.waitFor(3000);
    const cus =await page.waitForSelector('div[style="display: flex;"]');
    await page.click('div[style="display: flex;"]');
    const paid=await page.waitForSelector('.ant-btn-dashed:first-child');
    await paid.click(); 
    await page.waitFor(500);
    await page.click('button[type="submit"]');
    await page.waitFor(3000);
    await page.click('.ant-pro-page-header-wrap-content> a')
},40000);
it('修改测试',async ()=>{
    await page.waitFor(3000);
    await page.waitForSelector('.ant-table-row');
    await page.click('.ant-table-row');
    await page.waitFor(2000);
    await page.waitFor('.ant-btn-link');
    await page.click('.ant-btn-link');
    await page.waitFor(500);
    const con= await page.waitFor('textarea.ant-input');
    await page.click('textarea.ant-input');
    await con.type('修改成功');
    await page.click('.ant-modal-confirm-btns .ant-btn-primary');
    await page.waitFor(5000);
    
},40000);
});
