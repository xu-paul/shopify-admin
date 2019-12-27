import { message } from 'antd';
import { fakeSubmitForm,getProducts,addOrder,getCustomers } from './service';

const Model = {
  namespace: 'create',
  state: {
    data:{
      list:[],
    },
    item:0,
    status:'pending',
    image:'',
    customer:[],
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
         console.log('s',val,);
         yield put({
           type:'item',
           payload:val
         })  
         if(val.image==null){
          yield put({
            type:'getimage',
            payload:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=33325274,822918042&fm=26&gp=0.jpg'
          })    
         }
         else{
             yield put({
           type:'getimage',
           payload:val.image.src
         })      
         }
       
    }, 
    *changestatus({payload:status},{put}){
           yield put({
            type:'changes',
            payload:status
          })
    }, 
    *addorder({payload},{call,put}){    
       yield call(addOrder,payload);
       console.log('success');
       message.success('创建成功');
   
    },
    *getcustomer({payload},{call,put}){    
       const res= yield call(getCustomers);
       console.log('ccc',res.data.customers)
       yield put ({
         type:'customer',
         payload:res.data.customers
       })
     
    },
      

    },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
    item(state, action) {
      return { ...state, item:action.payload};
    },
    getimage(state, action) {
      return { ...state, image:action.payload};
    },
    changes(state, action) {
      return { ...state, status:action.payload};
    },
    customer(state, action) {
      return { ...state, customer:action.payload};
    },
   
    
  
  },
};
export default Model;
