import { putAdd,putVariant } from './service';
import { getRevised } from '../revisedProducts/service';
const revisedProductModel = {
  namespace: 'revised',
  state: {
      product:{},
      addContent:{
        
      },
      addVariants:{
        
      },
      variants:[]
  },
  effects: {
    *fetch({ payload : { id }}, {  put, select, call }){
      const { revised } = yield select();
      const  productID = yield call(getRevised, id);
      const product = productID.data.product;
      const addContent=revised.addContent
      const addVariants=revised.addVariants
      const variants =[]
      addContent["id"]=product.id;
      addVariants["id"]=product.variants[0].id;
      addVariants["sku"]=product.variants[0].sku;
     for (let index = 0; index < product.variants.length; index++) {
      variants.push({"id":product.variants[index].id})
     }
      yield put ({
        type:'fetchProduct',
        payload:{ product, addContent,addVariants,variants}
      })
    },
    

    *addProperty({ payload: { name, title } }, {  put, select }) {
      const { revised } = yield select();
      const e=revised.addContent
      e[name]=title;
      console.log(e);
      
      yield put({
        type: 'changeContent',
        payload: {addContent:e }
      })
    },
    *addVariants({ payload: { name, title } }, {  put, select }){
      const { revised } = yield select();
      const e=revised.addVariants
      e[name]=title;
      yield put({
        type: 'changeVariants',
        payload: {addVariants:e }
      })
    },
    *save(_,{ call ,put, select}){
      const { revised } = yield select()
      const  newProduct=  revised.addContent
      //const PropsNewProduct = Object.getOwnPropertyNames(newProduct);
      var variants= revised.variants
      variants[0]=revised.addVariants
      newProduct["variants"]=variants
      //for(var i=0 ;i<PropsNewProduct.length;i++){
        //if(newProduct[PropsNewProduct[i]]!==revised.product[PropsNewProduct[i]]){
          yield call(putAdd,newProduct)
          console.log('====================================');
          console.log(newProduct);
          console.log('====================================');
          //i=PropsNewProduct.length
       // }
      //}
      // const newVariant = revised.addVariants
      // const PropsNewVariant =Object.getOwnPropertyNames(newVariant);
      // for(var i=0 ;i<PropsNewVariant.length;i++){
      //   if(newVariant[PropsNewVariant[i]]!==revised.product.variants[0][PropsNewVariant[i]]){
      //     yield call(putVariant,newVariant)
      //     i=PropsNewVariant.length
      //   }
      // }
      //yield call(putAdd,newProduct)
    },
    *empty(_,{ put }){
      yield put({
        type: 'empty'
    })
    }
  },
  reducers: {
    changeContent(state, { payload:  { addContent } }) {
      console.log(state.addContent);
      
      return { ...state, addContent };
    },
    changeVariants(state, { payload:  { addVariants } }) {
      console.log(state.addVariants);
      
      return { ...state, addVariants };
    },
    empty(state,_){
      return { ...state,addContent:{"title":''},addVariants:{"fulfillment_service":"manual","sku":""}}
    },
    fetchProduct( state , { payload :{ product ,addContent,addVariants,variants}}){
      console.log(product,addContent);
      return { ...state , product,addContent,addVariants,variants}
    }
  },
};
export default revisedProductModel;
