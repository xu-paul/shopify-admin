import { message } from 'antd';
import {getDetailOrders,getProduct,updateOrder,updateE} from './service';

const Model = {
  namespace: 'detail',
  state: {
      list:[],
      src:''
  },
  effects: {
    *fetch({ payload:id,callback }, { call,put }) {  
     const res= yield call(getDetailOrders, id);
     const proid= yield call(getProduct, res.data.order.line_items[0].product_id);
         yield put({
             type:'save',
             payload:res.data.order
         })  
         yield put({
             type:'saveImage',
             payload:proid.data.product.image.src
         })  
         if (callback) callback();
    },  
    *update({payload:{id,f},callback},{call,put}){
      yield call(updateOrder,id,f);
      const res= yield call(getDetailOrders, id);
      yield put({
        type:'save',
        payload:res.data.order
    }) 
      console.log('updata');
      if (callback) callback();
    },
    *updateEmail({payload:{id,idc,e},callback},{call,put}){
      console.log(id,e);
      yield call(updateE,idc,e);
      const res= yield call(getDetailOrders,id);
      yield put({
        type:'save',
        payload:res.data.order
    }) 
      console.log('updata');
      if (callback) callback();
    }

  },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload };
    },
    saveImage(state, action) {
      return { ...state, src: action.payload };
    },
  
  },
};
export default Model;
