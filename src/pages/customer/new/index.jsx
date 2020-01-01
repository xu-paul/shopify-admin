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
  Row,
  Col
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import Link from 'umi/link'
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/customer',
    breadcrumbName: '顾客',
  },
  {
    path: '/customer/new',
    breadcrumbName: '创建顾客',
  },
];
class New extends Component {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'new/create',
          payload:{v:values},
        });
        console.log(values);  
        
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 10,
        },
      },
    };
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
    return (
      <PageHeaderWrapper title='创建顾客' breadcrumb={{routes}}>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
  {/*姓*/}
            <FormItem
              {...formItemLayout}
              label='first_name'
            >
              {getFieldDecorator('first_name', {
                rules: [
                  {
                    required: true,
                    message: '请输入姓'
                  },
                ],
              })(
                <Input
                  placeholder='姓'
                />,
              )}
            </FormItem>
  {/*名*/}
            <FormItem
              {...formItemLayout}
              label='last_name'
            >
              {getFieldDecorator('last_name', {
                rules: [
                  {
                    required: true,
                    message: '请输入名'
                  },
                ],
              })(
                <Input
                  placeholder='名'
                />,
              )}
            </FormItem>
    {/*邮箱*/}       
          <FormItem
              {...formItemLayout}
              label='email'
            >
              {getFieldDecorator('email')(
                <Input
                  placeholder='邮箱'
                />,
              )}
            </FormItem>
    {/*地址*/}       
          <FormItem
              {...formItemLayout}
              label='address1'
            >
              {getFieldDecorator('address1')(
                <Input
                  placeholder='地址'
                />,
              )}
            </FormItem>
    {/*所在城市*/}       
          <FormItem
              {...formItemLayout}
              label='city'
            >
              {getFieldDecorator('city')(
                <Input
                  placeholder='城市'
                />,
              )}
            </FormItem>
            <Row>
              <Col span={6} offset={7}>
               {/* 国家*/}
        <FormItem label="country" >
              {getFieldDecorator('country')(
                <Select
                  placeholder="国家"
                  style={{
                    width: '150px',
                  }}
                >
                  <Option value="CN">中国</Option>
                </Select>,
              )}
            </FormItem>
              </Col>

              <Col span={6}>
               {/* 省份*/}
        <FormItem label="province" >
              {getFieldDecorator('province')(
                <Select
                  placeholder="省份"
                  style={{
                    width: '150px',
                  }}
                >
                  <Option value="FJ">福建</Option>
                  <Option value="GD">广东</Option>
                  <Option value="SH">上海</Option>
                  <Option value="BJ">北京</Option>
                </Select>,
              )}
            </FormItem>
              </Col>
            </Row>
       
        
     {/*创建按钮*/}
            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
               创建顾客
              </Button>
              <Button type="primary" style={{marginLeft:'10px'}}>
                 <Link to='/customer'>返回顾客</Link>
              </Button>
             
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(
  connect(({ loading }) => ({
    submitting: loading.effects['new/create'],
  }))(New),
);
