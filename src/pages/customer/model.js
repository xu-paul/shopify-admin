import { addRule,removeRule, updateRule,getCustomers } from './service';
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
    *fetch({ payload }, { call, put }) {
      const response = yield call(getCustomers);
      console.log('payload',payload,'res',response);
      
      yield put({
        type: 'save',
        payload: {
          list: response.data.customers,
          pagination: {}
        },
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
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
