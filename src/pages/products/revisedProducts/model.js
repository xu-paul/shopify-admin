import { getRevised } from './service';

const ProductModel = {
  namespace: 'revised',
  state: {
    revisedRowKeys: [],
    selects: [{ title: 'Title', dataIndex: 'title' }],
    products: [],
    value: ['Title'],
  },
  effects: {
    *fetch(_, { call, put, select }) {
      const { revised } = yield select();
      var responses = [];
      console.log('123', revised);
      for (var i = '0'; i < revised.revisedRowKeys.length; i++) {
        var response = yield call(getRevised, revised.revisedRowKeys[i]);
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
      console.log(revisedRowKeys, '12312312');
    },
    *selects({ payload: { select, value } }, { put }) {
      var selectTable = [];

      for (var i = '0'; i < select.length; i++) {
        var selects = { title: select[i].props.value, dataIndex: select[i].props.label };
        selectTable.push(selects);
      }
      console.log(selectTable);
      yield put({
        type: 'revisedSelects',
        payload: { selectTable, value },
      });
    },
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
  },
};
export default ProductModel;
