import { getOrdersC,getProductsC,getCustomersC } from './service';

const ProductModel = {
  namespace: 'home',
  state: {
    Ocount: '',
    Pcount:'',
    Ccount:''
  },
  effects: {
    *fetch(_, { call, put, select }) {
      const Ocount = yield call(getOrdersC);
      const Pcount = yield call(getProductsC);
      const Ccount =yield call(getCustomersC);
      console.log(Ocount,Pcount);
      
      yield put({
        type: 'fetchHome',
        payload: { Ocount,Pcount,Ccount },
      });
    },
  },
  reducers: {
    fetchHome(state, { payload: { Ocount,Pcount,Ccount } }) {
      return { ...state, Ocount,Pcount ,Ccount};
    },
  },
};
export default ProductModel;
