import { message } from 'antd';
import { fakeSubmitForm,getProducts,addOrder,getProductsImages } from './service';

const Model = {
  namespace: 'create',
  state: {
    data:{
      list:[],
    },
    item:0,
    status:'pending',
    image:''
  },
  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *fetch(_,{call,put,select}){
       const res=yield call(getProducts);
       console.log(res);
        yield put({
           type:'item',
           payload:0
        })
        console.log('fetch成功');   
        yield put({
           type:'save',
           payload:{
              list:res.data.products,
           }
        })
       
    },
    *selectp({payload:val},{put,call}){
         console.log('s',val);
         const resp =yield call(getProductsImages,val.variants[0].product_id,val.variants[0].image_id);
         console.log(resp.data.image.src);
         yield put({
           type:'getid',
           payload:val
         })      
         yield put({
           type:'getimage',
           payload:resp.data.image.src
         })      
    }, 
    *changestatus({payload:status},{put}){
           yield put({
            type:'changes',
            payload:status
          })
    }, 
    *addorder({payload},{call}){    
       yield call(addOrder,payload);
       message.success('创建成功');
    },


    },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
    getid(state, action) {
      return { ...state, item:action.payload};
    },
    getimage(state, action) {
      return { ...state, image:action.payload};
    },
    changes(state, action) {
      return { ...state, status:action.payload};
    },
    item(state, action) {
      return { ...state, item:action.payload};
    },
    
  },
};
export default Model;
