import { message } from 'antd';
import { createCustomer } from './service';

const Model = {
  namespace: 'new',
  state: {},
  effects: {
    *create({ payload:{v} }, { call }) {
      console.log('v',v);
      const p={
        "customer": {
          "first_name": v.first_name,
          "last_name": v.last_name,
          "email": v.email,
          "addresses": [
            {
              "address1": v.address1,
              "city": v.city,
              "province": v.province,
              "country": v.country
            }
          ],
        }
      }
       yield call(createCustomer,p);
       message.success('创建成功');
    },
  },
};
export default Model;
