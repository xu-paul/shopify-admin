import { getAllProducts ,getInventory} from './service';

const InventoryModel = {
  namespace: 'inventory',
  state: {
     
  },
  effects: {
    *fetch(_,{ call, put }){
        console.log("111");
        const  products= yield call(getAllProducts);
        var inventory_item_id=''
        var inventoryArr=[]
        for (let index = 0; index < products.length; index++) {
           for (let i = 0; i < products[index].variants.length; i++) {
             if(products[index].variants[i].fulfillment_service=="manual"){
                inventory_item_id=inventory_item_id+products[index].variants[i].inventory_item_id+","
                inventoryArr.push({"src":products[index].images[i].src,
                                   "product":products[index].title+products[index].variants[i].title,
                                   "sku":products[index].variants[i].sku})
              }
            }
        }
       const inventory=yield call(getInventory,inventory_item_id)
       console.log(inventory);
    //   yield put({
    //     type: 'empty'
    // })
    }
  },
  reducers: {
   
    // empty(state,_){
    //   return { ...state,addContent:{"title":''},addVariants:{"fulfillment_service":"manual","sku":""}}
    // }
  },
};
export default InventoryModel;
