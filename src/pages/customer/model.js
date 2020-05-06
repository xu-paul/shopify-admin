import { getCustomers,removeCustomer } from './service';
import { routerRedux } from 'dva/router';
const Model = {
  namespace: 'customer',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getCustomers);
      yield put({
        type: 'save',
        payload: {
          list: response.data.customers,
          pagination: {}
        },
      });
    },
    *remove({ payload: { id }, callback }, { call, put }) {
      for (let i = 0; i < id.length; i++) {
        yield call(removeCustomer, id[i]);
      }
      yield put({
        type: 'fetch'
      });
      if (callback) callback();
    },  
    *linkdetail({ payload:id}, { put }) {
      console.log('id',id);
      yield put(routerRedux.replace(`/customer/customer_detail/${id}`));
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
export default Model;
