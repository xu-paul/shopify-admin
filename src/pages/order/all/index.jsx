import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
} from 'antd';
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';
import CreateForm from './components/CreateForm';
import StandardTable from './components/StandardTable';
import UpdateForm from './components/UpdateForm';
import styles from './style.less';
import Link from 'umi/link'
import { log } from 'util';
const FormItem = Form.Item;
const { Option } = Select;
const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/order/all',
    breadcrumbName: '订单',
  },
  {
    path: '/order/all',
    breadcrumbName: '所有订单',
  },
];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
class Order extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: 'Order',
      dataIndex: 'name',
      render:(val)=>val
    },
    {
      title: 'Date',
      dataIndex: 'processed_at',
      sorter:true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Customer',
       dataIndex: 'customer.first_name',
        render: (val, record) => (val==undefined?"/ /":`${val} ${record.customer.last_name}`),
    },
    {
      title: 'Payment',
      dataIndex: 'financial_status',
      render:val=>{return <Badge status={val=='paid'?"success":"processing"} text={val} className={styles.payment} />}
    },
    {
      title: 'Fulfillment',
      dataIndex: 'fulfillment_status',
      render:val=>{return <Badge status={val==null?"warning":"processing"} text={val ? val : 'Unfulfill'} className={styles.fulfillment} />}
    },
    {
      title: 'Total',
      dataIndex: 'total_price',
      render: (val, record) => currencyFormatter.format(val, {code: record.currency})
    }
  ];

  componentDidMount() {
    const { dispatch } = this.props; 
    dispatch({
      type: 'order/fetch',
    });
  }

  linkDetail=(id)=>{
    const { dispatch } = this.props; 
    dispatch({
      type: 'order/linkdetail',
      payload:id
    });

    
  } 
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch,order:{link,current} } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      cur:pagination.current,
      ...formValues,
      ...filters,
    };   
    const pa={};
    console.log('xsaxas',pagination.current,current);
    
    if (sorter.field) {
        if(sorter.order==undefined){
          params.order=sorter.field;
        }
      else{params.order = `${sorter.field} ${sorter.order.length==6?sorter.order.substr(0,3):sorter.order.substr(0,4)}`;}
    
    }

    if(pagination.current!=current){
      pa.cur=pagination.current;
      if(link.length==1){
        pa.page_info=link[0]
      }
      else{
        pagination.current>current?pa.page_info=link[1]:pa.page_info=link[0]
      }
      dispatch({
        type: 'order/changepage',
        payload:pa
      });
    }
    else{
      dispatch({
        type: 'order/fetch',
        payload: params,
      });
    }
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    
    dispatch({
      type: 'order/fetch',
      payload:1
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    console.log(selectedRows[0].id);
    
    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'order/remove',
          payload: {
            id: selectedRows.map(row=>row.id)
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;

      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    console.log(form);
    
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'order/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/add',
      payload: {
        desc: fields.desc,
      },
    });
    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });
    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form; 
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
          style={{paddingBottom:'20px'}}
        >
          <Col md={8} sm={24}>
            <FormItem label="Order">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="payment" >
              {getFieldDecorator('financial_status')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '200px',
                  }}
                >
                  <Option value="pending">pending</Option>
                  <Option value="paid">paid</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
         
        
         
        </Row>
        <Row
           gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}>
             <Col md={8} sm={24}>
            <FormItem label="fulfillment" >
              {getFieldDecorator('fulfillment_status')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '200px',
                  }}
                >
                  <Option value="shipped">fulfilled</Option>
                  <Option value="unshipped">Unfulfill</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>
              {/* <a
                style={{
                  marginLeft: 8,
                }}
                onClick={this.toggleForm}
              >
                展开 <Icon type="down" />
              </a> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

 

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      order: { data },
      loading,
    } = this.props;

    console.log('data',data.list);
    
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      
      <PageHeaderWrapper breadcrumb={{routes}} >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {/* <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button> */}
              <Link to={
                {pathname:'/order/draft/create'}
              }>
               添加订单
              </Link>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              onRow={(record,index) => {
                return {
                  onClick: () => {this.linkDetail(data.list[index].id)},    
                };
              }}
              rowKey="id"
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Order);
