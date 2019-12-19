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
  Col,
  Row
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import { log } from 'lodash-decorators/utils';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
@connect(({ create, loading }) => ({
  create,
  loading: loading.models.create,
}))
class CreateOrder extends Component {
  constructor(props) {
    super(props);
    
  }
  
  handleSubmit = e => {
    const { dispatch,create:{idd}} = this.props;
    console.log(this.props.form.getFieldsValue().first_name);
    
    const first_name=this.props.form.getFieldsValue().first_name==undefined?'/':this.props.form.getFieldsValue().first_name;
    const last_name=this.props.form.getFieldsValue().last_name==undefined?'/':this.props.form.getFieldsValue().last_name;
      
    const b={
        "order": {
          "line_items": [
            {
              "id": idd[0],
              "variant_id": idd[1],
              "quantity": 1
            }
          ],
          "customer": {  
            "first_name": first_name,
            "last_name": last_name
           }
        }
    }    
     dispatch({
       type:'create/addorder',
       payload:b
     })
    
  };
 componentDidMount(){
  const { dispatch } = this.props;
  dispatch({
    type: 'create/fetch',
  });
 }
 selectProduct=(val)=>{
       const arr =val.split(",");  
       const { dispatch} = this.props;       
       dispatch({
         type:'create/selectp',
         payload:arr 
       });   
 }
  render() {
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { create:{ data:{list} } } = this.props;
    return (
      <PageHeaderWrapper content='创建订单'>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
                <FormItem label="选择商品">       
           <Select  style={{ width: '600px' }} onChange={this.selectProduct} placeholder='请选择商品'>
            {
              list.map((item,index)=> <Option value={`${item.variants[0].product_id},${item.variants[0].id},${item.variants[0].inventory_quantity}`} key={index}>{item.title}</Option>)
            }
          </Select> 
          </FormItem> 
          <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
          >  
          <Col md={8} sm={24} >
            <FormItem label="姓">
              {getFieldDecorator('first_name')(<Input placeholder="选填" />)}
            </FormItem>
           </Col> 
           <Col md={8} sm={24} >
            <FormItem label="名">
              {getFieldDecorator('last_name')(<Input placeholder="选填" />)}
            </FormItem>
         </Col>
         </Row>
          <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="formandbasic-form.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="formandbasic-form.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(CreateOrder);
