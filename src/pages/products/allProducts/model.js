import { getProducts, getProductsCount, removeProducts } from './service';

const ProductsModel = {
  namespace: 'products',
  state: {
    products: [],
    order: null,
    addapi: {},
    count: 0,
    values: {},
    link: '',
    current: 1,
    columnKey: '',
  },
  effects: {
    *fetch(_, { call, put, select }) {
      const { products } = yield select();
      const response1 = yield call(getProducts, products.addapi);
      const response2 = yield call(getProductsCount, products.addapi);
      //console.log('headers.link', response1.headers.link);
      yield put({
        type: 'changeProducts',
        payload: {
          products: response1.data.products,
          productsCount: response2.data.count,
          link: response1.headers.link,
        },
      }); // Login successfully
    },
    *change({ payload: { current, order, values, columnKey } }, { call, put, select }) {
      const { products } = yield select();
      console.log('123', current, products.current);
      if (parseInt(current) == parseInt(products.current)) {
        if (columnKey == 'title') {
          if (order == 'ascend') {
            const orderApi = { order: 'title asc' };
            const addapi = { ...values, ...orderApi };
            yield put({
              type: 'changes',
              payload: { order, values, addapi, columnKey },
            });
          }

          if (order == 'descend') {
            const orderApi = { order: 'title desc' };
            const addapi = { ...values, ...orderApi };
            yield put({
              type: 'changes',
              payload: { order, values, addapi, columnKey },
            });
          }

          if (order == null) {
            const addapi = { ...values };
            yield put({
              type: 'changes',
              payload: { order, values, addapi, columnKey },
            });
          }
        }

        if (columnKey == 'record.variants') {
          if (order == 'ascend') {
            const orderApi = { order: 'inventory_total asc' };
            const addapi = { ...values, ...orderApi };
            yield put({
              type: 'changes',
              payload: { order, values, addapi, columnKey },
            });
          }

          if (order == 'descend') {
            const orderApi = { order: 'inventory_total desc' };
            const addapi = { ...values, ...orderApi };
            yield put({
              type: 'changes',
              payload: { order, values, addapi, columnKey },
            });
          }

          if (order == null) {
            const addapi = { ...values };
            yield put({
              type: 'changes',
              payload: { order, values, addapi, columnKey },
            });
          }
        }

        if (columnKey == '') {
          const addapi = { ...values };
          yield put({
            type: 'changes',
            payload: { order, values, addapi, columnKey },
          });
        }
      }
      if (parseInt(current) != parseInt(products.current)) {
        if (parseInt(current) == parseInt(products.current) + 1) {
          // const  regex=/\o\=(.+?)\>/g;
          // var results=regex.exec(products.link);
          // console.log(regex.exec(products.link)[1]);console.log(regex.exec(products.link)[1]);

          var result = products.link.match(/page_info=(\S*)>; rel="next/);
          const paginationApi = { page_info: result[1] };
          yield put({
            type: 'changesCurrent',
            payload: { current: current, addapi: paginationApi },
          });
        }
        if (parseInt(current) == parseInt(products.current) - 1) {
          var result = products.link.match(/page_info=(\S*)>; rel="previous/);
          const paginationApi = { page_info: result[1] };
          yield put({
            type: 'changesCurrent',
            payload: { current: current, addapi: paginationApi },
          });
        }
      }
    },
    *delete({ payload: { selectedRowKeys } }, { call }) {
      for (var i = '0'; i < selectedRowKeys.length; i++) {
        yield call(removeProducts, selectedRowKeys[i]);
        console.log('123', selectedRowKeys[i]);
      }
    },
  },
  reducers: {
    changeProducts(state, { payload: { products, productsCount, link } }) {
      return { ...state, products: products, count: productsCount, link: link };
    },
    changes(state, { payload: { order, values, addapi, columnKey } }) {
      return {
        ...state,
        order: order,
        addapi: addapi,
        values: values,
        current: 1,
        columnKey: columnKey,
      };
    },
    changesCurrent(state, { payload: { current, addapi } }) {
      return { ...state, current: current, addapi: addapi };
    },
  },
};
export default ProductsModel;
