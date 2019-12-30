import { getRevised, Revised } from './service';

const ProductModel = {
  namespace: 'reviseds',
  state: {
    revisedRowKeys: [],//选中商品的ID
    selects: [{ title: 'Title', dataIndex: 'title' }],//表格的columns
    products: [],//选中的商品返回的商品内容
    value: ['title'],//选择框内的数组
    revisedNew: []//修改后的文本数组
  },
  effects: {
    *fetch(_, { call, put, select }) {
      const { reviseds } = yield select();
      var responses = [];console.log("1");
      for (var i = 0; i < reviseds.revisedRowKeys.length; i++) {
        
        var e=parseInt(reviseds.revisedRowKeys[i])
        var response = yield call(getRevised, e);
        responses.push(response.data.product);
      }
      //
      yield put({
        type: 'revised',
        payload: { responses },
      }); // Login successfully
    },
    *rowKeys({ payload: { revisedRowKeys } }, { put }) {
      yield put({
        type: 'revisedRowKey',
        payload: { revisedRowKeys },
      });
    },
    *selects({ payload: { select, value } }, { put }) {
      var selectTable = [];

      for (var i = 0; i < select.length; i++) {
        var selects = { title: select[i].props.label, dataIndex: select[i].props.value };
        selectTable.push(selects);
      }
      yield put({
        type: 'revisedSelects',
        payload: { selectTable, value },
      });
    },
    *revisedNew({ payload: { revisedNew } }, { put }) {
      yield put({
        type: 'revisedNews',
        payload: { revisedNew },
      });
    },
    *save({ _ }, { call, put, select }) {
      const { reviseds } = yield select();
      const { revisedRowKeys, products, value, revisedNew } = reviseds
      for (var i = 0; i < revisedRowKeys.length; i++) {
        if (products[i] !== revisedNew[i]) {
          for (var e = 0; e < value.length; e++) {
            if (products[i][value[e]] !== revisedNew[i][value[e]]) {
              const t = {
                "product": {
                  "id": products[i].id,
                }
              }
              t.product[value[e]] = revisedNew[i][value[e]]
          yield call(Revised, products[i].id, t);
            }
          }

        }
      }
    },
    *empty({ _ }, { put }) {
      yield put({
        type: 'revisedEmpty',
      });
    }
  },
  reducers: {
    revised(state, { payload: { responses } }) {
      return { ...state, products: responses };
    },
    rowKeys(state, { payload: { revisedRowKeys } }) {
      return { ...state, revisedRowKeys: revisedRowKeys };
    },
    revisedSelects(state, { payload: { selectTable, value } }) {
      return { ...state, selects: selectTable, value };
    },
    revisedNews(state, { payload: { revisedNew } }) {
      return { ...state, revisedNew }
    },
    revisedEmpty(state, { _ }) {
      return { ...state, revisedRowKeys: [], products: [], revisedNew: [] }
    }
  },
};
export default ProductModel;
