import { getOrders} from './service';
import { removeOrders,getOrdersCount} from './service';
const Model = {
  namespace: 'order',
  state: {
    data: {
      list: [],
      pagination: {}, 
    },
    count:0,
    current:1,
    link:[]
  },
  effects: {
    *fetch({ payload }, { call, put,select }) {
      let reg =/(?<=page_info=).*?(?=>)/g
      let response = yield call(getOrders, payload);
      const res =yield call(getOrdersCount);
      const {order} =yield select();
      console.log('sss',order.current,payload,response);
      yield put({
        type: 'save',
        payload: {
          list: response.data.orders,
          pagination: {},
        },
      });
      yield put({
        type: 'count',
        payload:res.data.count
      });
      yield put({
        type: 'link',
        payload:response.headers.link.match(reg)
      });
      if(payload){
       yield put({
         type: 'current',
         payload:payload.cur
          });
      }
      
      
     
    },
   *changepage({payload:{cur,p}},{put,call,select}){
        const {order} =yield select();
        console.log('p',p);
        console.log('cur',cur,p);
        if(order.current<cur){
        const res =yield call(getOrders,p);
        yield put({
          type: 'save',
          payload: {
            list: res.data.orders,
            pagination: {},
          },
        });
       }
        
   },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *remove({ payload:{id}, callback }, { call, put }) {
      for(let i=0;i<id.length;i++)
      {
       let response = yield call(removeOrders, id[i]);
      yield put({
        type: 'save',
        payload: response,
      });
      }
      const res = yield call(getOrders);
      yield put({
        type: 'save',
        payload: {
          list: res.data.orders,
          pagination: {}
        },
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
    count(state, action) {
      return { ...state, count: action.payload };
    },
    link(state, action) {
      return { ...state, link: action.payload };
    },
    current(state, action) {
      return { ...state, current: action.payload };
    },
    
  },
};
export default Model;
