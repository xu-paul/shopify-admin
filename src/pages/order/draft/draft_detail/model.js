import { message } from 'antd';
import {getDraftOrders,getProduct,upDraftStatus,upDraftOrder} from './service';
import {routerRedux} from 'dva/router'
const Model = {
  namespace: 'draft_detail',
  state: {
    list:[],
    item:0,
    status:'pending',
    image:'',
    customer:[],
  },
  effects: {
    *fetch({payload,callback},{call,put,select}){
       const res=yield call(getDraftOrders,payload);
 
       let val=yield call(getProduct,res.data.draft_order.line_items[0].product_id);
       val=val.data.product;

        yield put({
           type:'save',
           payload:res.data.draft_order
        })
        yield put({
           type:'create/selectp',
           payload:val
        })
        if (callback) callback();    
    },
    *update({payload},{put,call}){
          yield call(upDraftStatus,payload);
          yield put(routerRedux.push('/order/draft'))  
    },
    *updatedraft({payload:{id,bbb}},{put,call}){
          yield call(upDraftOrder,id,bbb);
          message.success('更新成功');
           yield put(routerRedux.push('/order/draft'))  
    }
    

   
      

    },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload };
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
