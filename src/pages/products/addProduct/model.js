import { postAdd } from './service';

const ProductsModel = {
  namespace: 'addProduct',
  state: {
      addContent:{
          "title":'',
          "body_html":'',
          "vendor":'',

      },
      addVariants:{
        "fulfillment_service":"manual",
        "sku":""
      }
  },
  effects: {
    *addProperty({ payload: { name, title } }, {  put, select }) {
      const { addProduct } = yield select();
      const e=addProduct.addContent
      e[name]=title;
      console.log(addProduct.addContent);
      
      yield put({
        type: 'changeContent',
        payload: {addContent:e }
      })
    },
    *addVariants({ payload: { name, title } }, {  put, select }){
      const { addProduct } = yield select();
      const e=addProduct.addVariants
      e[name]=title;
      yield put({
        type: 'changeVariants',
        payload: {addVariants:e }
      })
    },
    *save(_,{ call ,put, select}){
      const { addProduct } = yield select()
      var newProduct=  addProduct.addContent
      newProduct["variants"]=[addProduct.addVariants]
      yield call(postAdd,newProduct)
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
    }
  },
};
export default ProductsModel;
