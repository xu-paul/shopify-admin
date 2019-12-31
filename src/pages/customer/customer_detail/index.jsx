import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import { Link } from 'umi';
import CardCdetail from './CardCdetail';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
@connect(({ cdetail, loading }) => ({
  cdetail,
  loading: loading.models.cdetail,
}))
class Cdetail extends Component {
  componentDidMount(){
     const { dispatch } =this.props
     dispatch({
       type:'cdetail/fetch',
       payload:{id:this.props.match.params.id}
     })
  }
  
  render() {
    console.log('ss',this.props.match.params.id);
    const {cdetail:{ list }} =this.props;
    return (
      <PageHeaderWrapper
        title={<h1>{list.first_name} {list.last_name}</h1>}
        content={
          <Link
            to={{
              pathname: '/customer',
            }}
          >
            返回顾客
          </Link>
        }
      >

        <CardCdetail />
      </PageHeaderWrapper>
    );
  }
}

export default Cdetail
