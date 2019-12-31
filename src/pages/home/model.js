import { getOrdersC } from './service';

const ProductModel = {
  namespace: 'home',
  state: {
    Ocount: '',
  },
  effects: {
    *fetch(_, { call, put, select }) {
      const Ocount = yield call(getOrdersC);
      yield put({
        type: 'fetchHome',
        payload: { Ocount },
      });
    },
  },
  reducers: {
    fetchHome(state, { payload: { Ocount } }) {
      return { ...state, Ocount };
    },
  },
};
export default ProductModel;
