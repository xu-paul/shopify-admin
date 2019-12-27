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
import  {routes}  from '../../.umi/router';  
import Link from 'umi/link'
import { log } from 'util';
const FormItem = Form.Item;
const { Option } = Select;

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
      // filters: [
      //   {
      //     text: status[0],
      //     value: '0',
      //   },
      //   {
      //     text: status[1],
      //     value: '1',
      //   },
      //   {
      //     text: status[2],
      //     value: '2',
      //   },
      //   {
      //     text: status[3],
      //     value: '3',
      //   },
      // ],

      // render(val) {
      //   return <Badge status={statusMap[val]} text={status[val]} />;
      // },
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
    // {
    //   title: '操作',
    //   render: (text, record) => (
    //     <Fragment>
    //       <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
    //       <Divider type="vertical" />
    //       <a href="">订阅警报</a>
    //     </Fragment>
    //   ),
    // },
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
        >
          <Col md={8} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="付款状态" >
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

  // renderAdvancedForm() {
  //   const {
  //     form: { getFieldDecorator },
  //   } = this.props;
  //   return (
  //     <Form onSubmit={this.handleSearch} layout="inline">
  //       <Row
  //         gutter={{
  //           md: 8,
  //           lg: 24,
  //           xl: 48,
  //         }}
  //       >
          
  //         <Col md={8} sm={24}>
  //           <FormItem label="订单号">
  //             {getFieldDecorator('name')(<Input placeholder="请输入" />)}
  //           </FormItem>
  //         </Col>

  //         <Col md={8} sm={24}>
  //           <FormItem label="付款状态">
  //             {getFieldDecorator('financial_status')(
  //               <Select
  //                 placeholder="请选择"
  //                 style={{
  //                   width: '100%',
  //                 }}
  //               >
  //                 <Option value="pending">pending</Option>
  //                 <Option value="paid">paid</Option>
  //               </Select>,
  //             )}
  //           </FormItem>
  //         </Col>
  //         <Col md={8} sm={24}>
  //           <FormItem label="顾客">
  //             {getFieldDecorator('customer.first_name')(<Input placeholder="请输入顾客的姓" />)}
  //           </FormItem>
  //         </Col>

          
  //       </Row>
  //       <Row
  //         gutter={{
  //           md: 8,
  //           lg: 24,
  //           xl: 48,
  //         }}
  //       >
  //         <Col md={8} sm={24}>
  //           <FormItem label="更新日期">
  //             {getFieldDecorator('date')(
  //               <DatePicker
  //                 style={{
  //                   width: '100%',
  //                 }}
  //                 placeholder="请输入更新日期"
  //               />,
  //             )}
  //           </FormItem>
  //         </Col>
  //         <Col md={8} sm={24}>
  //           <FormItem label="使用状态">
  //             {getFieldDecorator('status3')(
  //               <Select
  //                 placeholder="请选择"
  //                 style={{
  //                   width: '100%',
  //                 }}
  //               >
  //                 <Option value="0">关闭</Option>
  //                 <Option value="1">运行中</Option>
  //               </Select>,
  //             )}
  //           </FormItem>
  //         </Col>
  //         <Col md={8} sm={24}>
  //           <FormItem label="使用状态">
  //             {getFieldDecorator('status4')(
  //               <Select
  //                 placeholder="请选择"
  //                 style={{
  //                   width: '100%',
  //                 }}
  //               >
  //                 <Option value="0">关闭</Option>
  //                 <Option value="1">运行中</Option>
  //               </Select>,
  //             )}
  //           </FormItem>
  //         </Col>
  //       </Row>
  //       <div
  //         style={{
  //           overflow: 'hidden',
  //         }}
  //       >
  //         <div
  //           style={{
  //             float: 'right',
  //             marginBottom: 24,
  //           }}
  //         >
  //           <Button type="primary" htmlType="submit">
  //             查询
  //           </Button>
  //           <Button
  //             style={{
  //               marginLeft: 8,
  //             }}
  //             onClick={this.handleFormReset}
  //           >
  //             重置
  //           </Button>
  //           <a
  //             style={{
  //               marginLeft: 8,
  //             }}
  //             onClick={this.toggleForm}
  //           >
  //             收起 <Icon type="up" />
  //           </a>
  //         </div>
  //       </div>
  //     </Form>
  //   );
  // }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      order: { data,count },
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
      <PageHeaderWrapper >
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
