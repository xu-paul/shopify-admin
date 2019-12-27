import { getOrders } from './service';
import { routerRedux } from 'dva/router';
import { removeOrders, getOrdersCount, changePages } from './service';
const Model = {
  namespace: 'order',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    count: 0,
    current: 1,
    link: [],
    flag: true
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const reg = /(?<=page_info=).*?(?=>)/g;
      const { order } = yield select();
      console.log('.........', payload);

      const response = yield call(getOrders, payload);
      const res = yield call(getOrdersCount, payload);
      console.log('sss', order.current, payload, response);
      yield put({
        type: 'save',
        payload: {
          list: response.data.orders,
          pagination: {},
        },
      });
      yield put({
        type: 'count',
        payload: res.data.count
      });

      if (response.headers.link != null && payload && payload.order) {
        console.log('====================================');
        console.log('aaaaaaaaaaa');
        console.log('====================================');
        yield put({
          type: 'current',
          payload: 1
        });
        yield put({
          type: 'link',
          payload: {
            l: response.headers.link.match(reg)
          }
        });
      }
      if (response.headers.link != null && payload && payload.financial_status) {
        console.log('====================================');
        console.log('ssssss');
        console.log('====================================');
        yield put({
          type: 'current',
          payload: 1
        });
        yield put({
          type: 'link',
          payload: {
            l: response.headers.link.match(reg)
          }
        });

      }

      if (response.headers.link != null) {
        yield put({
          type: 'link',
          payload: { l: response.headers.link.match(reg) }
        });
      }

      if (payload == 1) {
        yield put({
          type: 'current',
          payload: 1
        });
        yield put({
          type: 'link',
          payload: {
            l: response.headers.link.match(reg)
          }
        });
      }



    },
    *changepage({ payload }, { put, call, select }) {
      const { order } = yield select();
      const reg = /(?<=page_info=).*?(?=>)/g;
      const res = yield call(changePages, payload);
      yield put({
        type: 'save',
        payload: {
          list: res.data.orders,
          pagination: {},
        },
      });
      yield put({
        type: 'current',
        payload: payload.cur
      });
      yield put({
        type: 'link',
        payload: {
          l: res.headers.link.match(reg)
        }
      });


    },
    *reflag({ payload }, { put }) {
      yield put({
        type: 'flag',
        payload: true
      })
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *remove({ payload: { id }, callback }, { call, put }) {
      for (let i = 0; i < id.length; i++) {
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
      
    *linkdetail({ payload:id}, { put }) {
      console.log('id',id);
      yield put(routerRedux.replace(`/order/all/order_detail/${id}`));
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
      return { ...state, link: action.payload.l };
    },
    current(state, action) {
      return { ...state, current: action.payload };
    },
    flag(state, action) {
      return { ...state, flag: action.payload };
    },

  },
};
export default Model;
