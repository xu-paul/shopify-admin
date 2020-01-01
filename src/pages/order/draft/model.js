import { getDraftOrders,removeDraftOrders } from './service';
import { routerRedux } from 'dva/router';
const Model = {
  namespace: 'draft',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getDraftOrders, payload);
      console.log('payload',payload,'res',response);
      
      yield put({
        type: 'save',
        payload: {
          list: response.data.draft_orders,
          pagination: {}
        },
      });
    },
    *remove({ payload: { id }, callback }, { call, put }) {
      for (let i = 0; i < id.length; i++) {
        yield call(removeDraftOrders, id[i]);
      }
      yield put({
        type: 'fetch'
      });
      if (callback) callback();
    },  
    *linkdetail({ payload:id}, { put }) {
      console.log('id',id);
      yield put(routerRedux.replace(`/order/draft/draft_detail/${id}`));
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
export default Model;
