import { message } from 'antd';
import { getCustomer,changeN } from './service';

const Model = {
  namespace: 'cdetail',
  state: {
    list:[]
  },
  effects: {
    *fetch({ payload:{id} }, { call, put }) {
      const response = yield call(getCustomer,id);
      console.log('res',response);
      yield put({
        type: 'save',
        payload: response.data.customer,
      });
    },
    *changeNote({ payload:{id,p}}, { call, put }) {
      console.log(id,p);
      
      yield call(changeN,id,p);
      message.success('保存成功');
    
    },



  },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
