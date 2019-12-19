import { message } from 'antd';
import { fakeSubmitForm,getProducts,addOrder } from './service';

const Model = {
  namespace: 'create',
  state: {
    data:{
      list:[],
    },
    idd:[]
  },
  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *fetch(_,{call,put,select}){
       const res=yield call(getProducts);
       console.log(res);
       
        console.log('fetch成功');   
        yield put({
           type:'save',
           payload:{
              list:res.data.products,
           }
        })
    },
    *selectp({payload:arr},{put}){
         console.log('s',arr);
         yield put({
           type:'getid',
           payload:arr
         })      
    },  
    *addorder({payload},{call}){    
       yield call(addOrder,payload);
    },


    },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
    getid(state, action) {
      return { ...state, idd:action.payload};
    },
  
  },
};
export default Model;
